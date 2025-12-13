import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    // For now, return a mock user profile
    // In a real app, you'd get this from JWT token
    const userProfile = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://via.placeholder.com/150',
      phone: '+27 11 234 5678',
      favorites: []
    }

    res.json({
      success: true,
      data: userProfile
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    })
  }
}

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body

    // Mock update - in real app, update in database
    const updatedProfile = {
      id: '1',
      name: name || 'John Doe',
      email: email || 'john@example.com',
      avatar: avatar || 'https://via.placeholder.com/150',
      phone: phone || '+27 11 234 5678'
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    })
  }
}

// Add property to favorites
export const addToFavorites = async (req, res) => {
  try {
    const { propertyId } = req.body

    // Mock favorite addition
    res.json({
      success: true,
      message: 'Property added to favorites',
      data: { propertyId }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add to favorites',
      error: error.message
    })
  }
}

// Remove property from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params

    // Mock favorite removal
    res.json({
      success: true,
      message: 'Property removed from favorites',
      data: { propertyId: id }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove from favorites',
      error: error.message
    })
  }
}

// Register user (create user)
export const registerUser = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Use email prefix as default name
          bookedVisits: [],
          favResidenciesID: []
        }
      })
    }

    res.json({
      success: true,
      message: 'User registered successfully',
      data: user
    })
  } catch (error) {
    console.error('Register user error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to register user',
      error: error.message
    })
  }
}

// Add property to favorites (toFav)
export const toFav = async (req, res) => {
  try {
    const { id } = req.params
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Property ID is required'
      })
    }

    // Convert ID to string for consistency
    const propertyId = String(id)

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Create user if doesn't exist (for mock auth)
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Use email prefix as name
          favResidenciesID: [],
          bookedVisits: []
        }
      })
    }

    // Ensure favResidenciesID is an array
    const currentFavorites = Array.isArray(user.favResidenciesID) 
      ? user.favResidenciesID.map(favId => String(favId))
      : []

    // Check if already in favorites (compare as strings)
    const isFav = currentFavorites.includes(propertyId)

    if (isFav) {
      // Remove from favorites
      const updatedFavorites = currentFavorites.filter(favId => favId !== propertyId)
      
      await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: updatedFavorites
        }
      })

      return res.json({
        success: true,
        message: 'Property removed from favorites',
        favResidenciesID: updatedFavorites
      })
    } else {
      // Add to favorites
      const updatedFavorites = [...currentFavorites, propertyId]
      
      await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: updatedFavorites
        }
      })

      return res.json({
        success: true,
        message: 'Property added to favorites',
        favResidenciesID: updatedFavorites
      })
    }
  } catch (error) {
    console.error('ToFav error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update favorites',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// Get all favorites
export const allFav = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        favResidenciesID: true
      }
    })

    // Return empty array if user doesn't exist
    const favorites = user?.favResidenciesID || []
    
    // Ensure all IDs are strings
    const stringFavorites = Array.isArray(favorites) 
      ? favorites.map(id => String(id))
      : []

    res.json({
      success: true,
      favResidenciesID: stringFavorites
    })
  } catch (error) {
    console.error('AllFav error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get favorites',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// Book a visit
export const bookVisit = async (req, res) => {
  try {
    const { id } = req.params
    const { email, date } = req.body

    if (!email || !date) {
      return res.status(400).json({
        success: false,
        message: 'Email and date are required'
      })
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Property ID is required'
      })
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Create user if doesn't exist (for mock auth)
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          favResidenciesID: [],
          bookedVisits: []
        }
      })
    }

    // Ensure bookedVisits is an array
    const currentBookings = Array.isArray(user.bookedVisits) ? user.bookedVisits : []

    // Check if booking already exists
    const existingBooking = currentBookings.find(booking => 
      String(booking.id) === String(id) && booking.date === date
    )

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This visit is already booked'
      })
    }

    // Add booking to user's bookedVisits
    const newBooking = {
      id: String(id),
      date: String(date)
    }

    const updatedBookings = [...currentBookings, newBooking]

    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: updatedBookings
      }
    })

    res.json({
      success: true,
      message: 'Visit booked successfully',
      bookedVisits: updatedBookings
    })
  } catch (error) {
    console.error('BookVisit error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to book visit',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// Remove booking
export const removeBooking = async (req, res) => {
  try {
    const { id } = req.params
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.json({
        success: true,
        bookedVisits: []
      })
    }

    // Remove booking
    const updatedBookings = (user.bookedVisits || []).filter(
      booking => booking.id !== id
    )

    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: updatedBookings
      }
    })

    res.json({
      success: true,
      message: 'Booking removed successfully',
      bookedVisits: updatedBookings
    })
  } catch (error) {
    console.error('RemoveBooking error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to remove booking',
      error: error.message
    })
  }
}

// Get all bookings
export const allBookings = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        bookedVisits: true
      }
    })

    if (!user) {
      return res.json({
        success: true,
        bookedVisits: []
      })
    }

    res.json({
      success: true,
      bookedVisits: user.bookedVisits || []
    })
  } catch (error) {
    console.error('AllBookings error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to get bookings',
      error: error.message
    })
  }
}