import express from 'express'
import { 
  getAllProperties, 
  getPropertyById, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  getPropertyStats,
  searchProperties,
  getFeaturedProperties,
  getSimilarProperties
} from '../controllers/resdCntrl.js'

const router = express.Router()

// Get all properties with pagination and filtering
router.get('/', getAllProperties)

// Get property by ID
router.get('/:id', getPropertyById)

// Create new property
router.post('/', createProperty)

// Update property
router.put('/:id', updateProperty)

// Delete property
router.delete('/:id', deleteProperty)

// Get property statistics
router.get('/stats/overview', getPropertyStats)

// Search properties
router.get('/search/query', searchProperties)

// Get featured properties
router.get('/featured/list', getFeaturedProperties)

// Get similar properties
router.get('/:id/similar', getSimilarProperties)

export default router 