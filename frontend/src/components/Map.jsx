import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet'
import { FaCrown, FaStar, FaMapMarkerAlt, FaSearch, FaFilter, FaLocationArrow } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Custom marker icons
const createCustomIcon = (color = '#f59e0b') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, ${color}, ${color}dd);
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        color: white;
        font-weight: bold;
        font-size: 16px;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

// Map controls component
const MapControls = ({ onFilterChange, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filters = [
    { id: 'all', label: 'All Properties', color: '#f59e0b' },
    { id: 'house', label: 'Houses', color: '#3b82f6' },
    { id: 'apartment', label: 'Apartments', color: '#10b981' },
    { id: 'villa', label: 'Villas', color: '#8b5cf6' },
    { id: 'commercial', label: 'Commercial', color: '#ef4444' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className='absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 p-4'
    >
      {/* Search Bar */}
      <div className='relative mb-4'>
        <input
          type='text'
          placeholder='Search locations...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full px-4 py-2 pl-10 bg-white/80 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500'
        />
        <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400' />
      </div>

      {/* Filter Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg font-medium mb-4'
      >
        <FaFilter className='text-sm' />
        Filters
      </motion.button>

      {/* Filter Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='space-y-2'
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange(filter.id)}
                className='flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors'
              >
                <div 
                  className='w-4 h-4 rounded-full'
                  style={{ backgroundColor: filter.color }}
                />
                <span className='text-sm font-medium text-neutral-700'>{filter.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Property marker component
const PropertyMarker = ({ property, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getMarkerColor = (category) => {
    const colors = {
      house: '#3b82f6',
      apartment: '#10b981',
      villa: '#8b5cf6',
      commercial: '#ef4444',
      default: '#f59e0b'
    }
    return colors[category] || colors.default
  }

  const icon = createCustomIcon(getMarkerColor(property.category))

  return (
    <Marker
      position={[property.lat, property.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onClick(property),
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false)
      }}
    >
      <Popup>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className='p-4 min-w-[250px]'
        >
          <div className='flex items-center gap-2 mb-3'>
            <FaCrown className='text-amber-500' />
            <span className='font-bold text-secondary'>Premium Property</span>
          </div>
          
          <h3 className='font-bold text-lg mb-2'>{property.title}</h3>
          
          <div className='flex items-center gap-2 text-neutral-600 mb-3'>
            <FaMapMarkerAlt className='text-tertiary' />
            <span className='text-sm'>{property.address}</span>
          </div>
          
          <div className='flex items-center gap-4 mb-3 text-sm text-neutral-600'>
            <div className='flex items-center gap-1'>
              <FaStar className='text-amber-500' />
              <span>{property.rating || 4.8}</span>
            </div>
            <span className='font-bold text-secondary'>{property.price}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white py-2 rounded-lg font-medium'
          >
            View Details
          </motion.button>
        </motion.div>
      </Popup>
    </Marker>
  )
}

// Simple map component for single location
const SimpleMap = ({ address, city, country }) => {
  // Default to South Africa center if no location provided
  const defaultCenter = [-30.5595, 22.9375]
  const defaultZoom = 6
  
  // Try to geocode the address (simplified - in production, use a geocoding service)
  const getCoordinates = () => {
    // For now, use default center
    // In production, you'd use a geocoding API like OpenCage, Google Maps, etc.
    return defaultCenter
  }

  const [center] = useState(getCoordinates())
  const [zoom] = useState(address && city ? 13 : defaultZoom)

  return (
    <div className='w-full h-full min-h-[300px] rounded-lg overflow-hidden'>
      <MapContainer
        center={center}
        zoom={zoom}
        className='w-full h-full'
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {address && city && (
          <Marker position={center} icon={createCustomIcon('#f59e0b')}>
            <Popup>
              <div className='p-2'>
                <p className='font-semibold text-sm'>{address}</p>
                <p className='text-xs text-gray-600'>{city}, {country || 'South Africa'}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

// Map component with advanced features
const Map = ({ properties = [], onPropertySelect, address, city, country }) => {
  // If address/city/country are provided, use simple map mode
  if (address || city || country) {
    return <SimpleMap address={address} city={city} country={country} />
  }

  // Otherwise, use the full interactive map
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // South Africa center coordinates
  const mapCenter = [-30.5595, 22.9375]
  const mapZoom = 6

  const filteredProperties = filter === 'all' 
    ? properties 
    : properties.filter(p => p.category === filter)

  const handlePropertyClick = (property) => {
    setSelectedProperty(property)
    onPropertySelect?.(property)
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className='max-padd-container py-16'
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='text-center mb-12'
      >
        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 shadow-lg'>
          <FaMapMarkerAlt className='text-tertiary' />
          <span>Interactive Property Map</span>
        </div>
        
        <h2 className='h2 text-premium mb-4'>
          Explore Properties Across South Africa
        </h2>
        <p className='regular-16 text-neutral-600 max-w-2xl mx-auto'>
          Discover premium properties in the most sought-after locations across South Africa. 
          Use our interactive map to explore neighborhoods and find your perfect home.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='relative bg-gradient-to-br from-white to-neutral-50 rounded-3xl border border-amber-200/20 shadow-xl overflow-hidden'
      >
        <div className='h-[600px] relative'>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className='w-full h-full'
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {filteredProperties.map((property) => (
              <PropertyMarker
                key={property.id}
                property={property}
                isSelected={selectedProperty?.id === property.id}
                onClick={handlePropertyClick}
              />
            ))}
    </MapContainer>

          <MapControls 
            onFilterChange={handleFilterChange}
            onSearch={(query) => console.log('Search:', query)}
          />

          {/* Property Info Panel */}
          <AnimatePresence>
            {selectedProperty && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className='absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-neutral-200 p-6 max-w-sm'
              >
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-bold text-lg text-secondary'>{selectedProperty.title}</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProperty(null)}
                    className='text-neutral-400 hover:text-neutral-600'
                  >
                    ×
                  </motion.button>
                </div>
                
                <div className='space-y-3'>
                  <div className='flex items-center gap-2 text-neutral-600'>
                    <FaMapMarkerAlt className='text-tertiary' />
                    <span className='text-sm'>{selectedProperty.address}</span>
                  </div>
                  
                  <div className='flex items-center gap-4 text-sm'>
                    <div className='flex items-center gap-1'>
                      <FaStar className='text-amber-500' />
                      <span>{selectedProperty.rating || 4.8}</span>
                    </div>
                    <span className='font-bold text-secondary'>{selectedProperty.price}</span>
                  </div>
                  
                  <p className='text-sm text-neutral-600 line-clamp-2'>
                    {selectedProperty.description}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white py-2 rounded-lg font-medium'
                  >
                    View Full Details
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Map