import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'

// Import routes
import userRoute from './routes/userRoute.js'
import residencyRoute from './routes/residencyRoute.js'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})

// Initialize Prisma
const prisma = new PrismaClient()

// Advanced middleware setup
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', limiter)

// Compression middleware
app.use(compression())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging middleware
app.use(morgan('combined'))

// Request timing middleware
app.use((req, res, next) => {
  req.startTime = Date.now()
  next()
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API versioning and documentation
app.get('/api', (req, res) => {
  res.json({
    message: 'RealHomes South Africa API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      health: '/health',
      users: '/api/user',
      properties: '/api/residency',
      documentation: '/api/docs'
    }
  })
})

// Routes
app.use('/api/user', userRoute)
app.use('/api/residency', residencyRoute)

// Advanced error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  
  const errorResponse = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  }

  res.status(errorResponse.status).json(errorResponse)
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    status: 404,
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  })
})

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  // Handle property view events
  socket.on('property_view', (data) => {
    console.log('Property viewed:', data)
    // Broadcast to other clients for real-time analytics
    socket.broadcast.emit('property_viewed', data)
  })

  // Handle search events
  socket.on('property_search', (data) => {
    console.log('Property search:', data)
    // Could be used for analytics or recommendations
  })

  // Handle favorite events
  socket.on('property_favorite', (data) => {
    console.log('Property favorited:', data)
    socket.broadcast.emit('property_favorited', data)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Database connection and server startup
const PORT = process.env.PORT || 8000

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/health`)
      console.log(`🔗 API documentation: http://localhost:${PORT}/api`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...')
  await prisma.$disconnect()
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...')
  await prisma.$disconnect()
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

startServer()

export { prisma, io }