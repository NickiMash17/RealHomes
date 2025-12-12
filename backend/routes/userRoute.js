import express from 'express'
import { 
  getUserProfile, 
  updateUserProfile, 
  addToFavorites, 
  removeFromFavorites,
  registerUser,
  toFav,
  allFav,
  bookVisit,
  removeBooking,
  allBookings
} from '../controllers/userCntrl.js'

const router = express.Router()

// Register user
router.post('/register', registerUser)

// Get user profile
router.get('/profile', getUserProfile)

// Update user profile
router.put('/profile', updateUserProfile)

// Add/remove property to favorites (toFav)
router.post('/toFav/:id', toFav)

// Get all favorites
router.post('/allFav', allFav)

// Book a visit
router.post('/bookVisit/:id', bookVisit)

// Remove booking
router.post('/removeBooking/:id', removeBooking)

// Get all bookings
router.post('/allBookings', allBookings)

// Legacy routes (for backward compatibility)
router.post('/favorites', addToFavorites)
router.delete('/favorites/:id', removeFromFavorites)

export default router
