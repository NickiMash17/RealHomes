import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

// Cache for frequently accessed data
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Helper function to validate and sanitize input
const validateInput = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    })
  }
  next()
}

// Helper function to handle database errors
const handleDatabaseError = (error, res) => {
  console.error('Database error:', error)
  
  if (error.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'A property with this information already exists'
    })
  }
  
  if (error.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Property not found'
    })
  }
  
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  })
}

// Get all properties with advanced filtering and pagination
export const getAllProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = req.query

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Build filter conditions
    const where = {}
    
    if (category) where.category = category
    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) }
    if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms) }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice)
      if (maxPrice) where.price.lte = parseInt(maxPrice)
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Validate sort fields
    const allowedSortFields = ['createdAt', 'price', 'title', 'rating', 'bedrooms']
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt'
    const order = sortOrder === 'asc' ? 'asc' : 'desc'

    // Check cache first
    const cacheKey = `properties_${JSON.stringify(req.query)}`
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data)
    }

    // Execute query
    const [properties, total] = await Promise.all([
      prisma.residency.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { [sortField]: order },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatar: true
            }
          }
        }
      }),
      prisma.residency.count({ where })
    ])

    const totalPages = Math.ceil(total / limitNum)
    const hasNext = pageNum < totalPages
    const hasPrev = pageNum > 1

    const result = {
      success: true,
      data: properties,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNext,
        hasPrev
      },
      filters: {
        category,
        city,
        minPrice,
        maxPrice,
        bedrooms,
        bathrooms,
        search
      }
    }

    // Cache the result
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })

    res.json(result)
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Get property by ID with detailed information
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params

    // Check cache
    const cacheKey = `property_${id}`
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data)
    }

    const property = await prisma.residency.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
            phone: true
          }
        }
      }
    })

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    // Increment view count
    await prisma.residency.update({
      where: { id },
      data: { views: { increment: 1 } }
    })

    const result = {
      success: true,
      data: property
    }

    // Cache the result
    cache.set(cacheKey, {
      data: result,
      timestamp: Date.now()
    })

    res.json(result)
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Create new property with validation
export const createProperty = async (req, res) => {
  try {
  const {
    title,
    description,
    price,
    address,
      city,
    country,
      image,
    facilities,
      userEmail
    } = req.body

    // Validate required fields
    if (!title || !description || !price || !address || !city || !country) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      })
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const property = await prisma.residency.create({
      data: {
        title,
        description,
        price: parseInt(price),
        address,
        city,
        country,
        image,
        facilities: JSON.parse(facilities),
        userEmail
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    // Clear cache
    cache.clear()

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Update property
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    // Remove userEmail from update data if present
    delete updateData.userEmail

    const property = await prisma.residency.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    // Clear cache
    cache.clear()

    res.json({
      success: true,
      message: 'Property updated successfully',
      data: property
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Delete property
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.residency.delete({
      where: { id }
    })

    // Clear cache
    cache.clear()

    res.json({
      success: true,
      message: 'Property deleted successfully'
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Get property statistics
export const getPropertyStats = async (req, res) => {
  try {
    const stats = await prisma.$transaction([
      prisma.residency.count(),
      prisma.residency.aggregate({
        _avg: { price: true },
        _min: { price: true },
        _max: { price: true }
      }),
      prisma.residency.groupBy({
        by: ['category'],
        _count: { category: true }
      }),
      prisma.residency.groupBy({
        by: ['city'],
        _count: { city: true },
        orderBy: { _count: { city: 'desc' } },
        take: 5
      })
    ])

    const [totalProperties, priceStats, categoryStats, topCities] = stats

    res.json({
      success: true,
      data: {
        totalProperties,
        priceStats: {
          average: priceStats._avg.price,
          minimum: priceStats._min.price,
          maximum: priceStats._max.price
        },
        categoryStats,
        topCities
      }
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Search properties with advanced filters
export const searchProperties = async (req, res) => {
  try {
    const {
      query,
      category,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities
    } = req.query

    const where = {}

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { address: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } }
      ]
    }

    if (category) where.category = category
    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice)
      if (maxPrice) where.price.lte = parseInt(maxPrice)
    }
    if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) }
    if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms) }
    if (amenities) {
      where.facilities = {
        path: ['amenities'],
        array_contains: amenities.split(',')
      }
    }

    const properties = await prisma.residency.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: properties,
      total: properties.length
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Get featured properties
export const getFeaturedProperties = async (req, res) => {
  try {
    const properties = await prisma.residency.findMany({
      where: {
        featured: true
      },
      take: 6,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: properties
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}

// Get similar properties
export const getSimilarProperties = async (req, res) => {
  try {
    const { id } = req.params

    const currentProperty = await prisma.residency.findUnique({
      where: { id }
    })

    if (!currentProperty) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      })
    }

    const similarProperties = await prisma.residency.findMany({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
              { category: currentProperty.category },
              { city: currentProperty.city },
              {
                price: {
                  gte: currentProperty.price * 0.8,
                  lte: currentProperty.price * 1.2
                }
              }
            ]
          }
        ]
      },
      take: 4,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({
      success: true,
      data: similarProperties
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}
