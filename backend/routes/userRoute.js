import express from 'express'
import { getUserProfile, updateUserProfile, addToFavorites, removeFromFavorites } from '../controllers/userCntrl.js'

const router = express.Router()

// Get user profile
router.get('/profile', getUserProfile)

// Update user profile
router.put('/profile', updateUserProfile)

// Add property to favorites
router.post('/favorites', addToFavorites)

// Remove property from favorites
router.delete('/favorites/:id', removeFromFavorites)

export default router
