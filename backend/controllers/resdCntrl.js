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
    
    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice)
      if (maxPrice) where.price.lte = parseInt(maxPrice)
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Validate sort fields
    const allowedSortFields = ['createdAt', 'price', 'title', 'updatedAt']
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt'
    const order = sortOrder === 'asc' ? 'asc' : 'desc'

    // Check cache first
    const cacheKey = `properties_${JSON.stringify(req.query)}`
    const cached = cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data)
    }

    // Execute query - get all properties first for filtering
    const allProperties = await prisma.residency.findMany({
      where,
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: { [sortField]: order }
    })

    // Transform properties to match frontend expectations
    const transformedProperties = allProperties.map(property => {
      const facilities = typeof property.facilities === 'string' 
        ? JSON.parse(property.facilities) 
        : property.facilities || {}
      
      return {
        id: property.id,
        title: property.title,
        description: property.description,
        price: property.price,
        address: property.address,
        city: property.city,
        country: property.country,
        image: property.image,
        facilities: facilities,
        rating: facilities.rating || 4.5,
        category: facilities.category || 'Property',
        featured: facilities.featured || false,
        bedrooms: facilities.bedrooms || facilities.bed || 0,
        bathrooms: facilities.bathrooms || facilities.bath || 0,
        parkings: facilities.parkings || facilities.parking || 0,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt
      }
    })
    
    // Apply client-side filtering for category, bedrooms, bathrooms if needed
    let filteredProperties = transformedProperties
    if (category) {
      filteredProperties = filteredProperties.filter(p => 
        p.category?.toLowerCase().includes(category.toLowerCase())
      )
    }
    if (bedrooms) {
      filteredProperties = filteredProperties.filter(p => 
        p.bedrooms >= parseInt(bedrooms)
      )
    }
    if (bathrooms) {
      filteredProperties = filteredProperties.filter(p => 
        p.bathrooms >= parseInt(bathrooms)
      )
    }

    // Apply pagination after filtering
    const total = filteredProperties.length
    const paginatedProperties = filteredProperties.slice(skip, skip + limitNum)
    const totalPages = Math.ceil(total / limitNum)
    const hasNext = pageNum < totalPages
    const hasPrev = pageNum > 1

    const result = {
      success: true,
      data: paginatedProperties,
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
        owner: {
          select: {
            name: true,
            email: true,
            image: true
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

    // Note: views field doesn't exist in schema, would need to add it or track in facilities

    // Transform property to match frontend expectations
    const facilities = typeof property.facilities === 'string' 
      ? JSON.parse(property.facilities) 
      : property.facilities || {}
    
    const transformedProperty = {
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      address: property.address,
      city: property.city,
      country: property.country,
      image: property.image,
      facilities: facilities,
      rating: facilities.rating || 4.5,
      category: facilities.category || 'Property',
      featured: facilities.featured || false,
      bedrooms: facilities.bedrooms || facilities.bed || 0,
      bathrooms: facilities.bathrooms || facilities.bath || 0,
      parkings: facilities.parkings || facilities.parking || 0,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt
    }

    const result = {
      success: true,
      data: transformedProperty
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
      // Category stats would need to be calculated from facilities JSON
      Promise.resolve([]),
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

    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseInt(minPrice)
      if (maxPrice) where.price.lte = parseInt(maxPrice)
    }
    // Note: bedrooms and bathrooms are in facilities JSON, filtered client-side
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
    // Get all properties and filter by featured in facilities
    const allProperties = await prisma.residency.findMany({
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Filter by featured property in facilities
    const featuredProperties = allProperties
      .filter(property => {
        const facilities = typeof property.facilities === 'string' 
          ? JSON.parse(property.facilities) 
          : property.facilities || {}
        return facilities.featured === true
      })
      .slice(0, 6)
      .map(property => {
        const facilities = typeof property.facilities === 'string' 
          ? JSON.parse(property.facilities) 
          : property.facilities || {}
        return {
          ...property,
          facilities,
          rating: facilities.rating || 4.5,
          category: facilities.category || 'Property',
          featured: true
        }
      })

    res.json({
      success: true,
      data: featuredProperties
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

    const currentFacilities = typeof currentProperty.facilities === 'string' 
      ? JSON.parse(currentProperty.facilities) 
      : currentProperty.facilities || {}
    
    const similarProperties = await prisma.residency.findMany({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
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
      take: 10, // Get more to filter by category
      include: {
        owner: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Filter by category if available
    const filteredSimilar = similarProperties
      .filter(property => {
        const facilities = typeof property.facilities === 'string' 
          ? JSON.parse(property.facilities) 
          : property.facilities || {}
        return !currentFacilities.category || facilities.category === currentFacilities.category
      })
      .slice(0, 4)
      .map(property => {
        const facilities = typeof property.facilities === 'string' 
          ? JSON.parse(property.facilities) 
          : property.facilities || {}
        return {
          ...property,
          facilities,
          rating: facilities.rating || 4.5,
          category: facilities.category || 'Property'
        }
      })

    res.json({
      success: true,
      data: filteredSimilar
    })
  } catch (error) {
    handleDatabaseError(error, res)
  }
}
