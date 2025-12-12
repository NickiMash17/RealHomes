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

// Get property statistics (must be before /:id route)
router.get('/stats/overview', getPropertyStats)

// Search properties (must be before /:id route)
router.get('/search/query', searchProperties)

// Get featured properties (must be before /:id route)
router.get('/featured/list', getFeaturedProperties)

// Create new property - support both /create and / endpoints
router.post('/create', createProperty)
router.post('/', createProperty)

// Get property by ID
router.get('/:id', getPropertyById)

// Get similar properties
router.get('/:id/similar', getSimilarProperties)

// Update property
router.put('/:id', updateProperty)

// Delete property
router.delete('/:id', deleteProperty)

export default router 