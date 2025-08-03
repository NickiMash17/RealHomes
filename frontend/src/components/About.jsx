import React from 'react'
import { FaCrown, FaStar, FaUsers, FaHome, FaGlobe, FaTrophy } from 'react-icons/fa'

const About = () => {
  const stats = [
    { icon: <FaHome className='text-2xl' />, value: 500, suffix: '+', label: 'Properties Sold', color: 'text-blue-500' },
    { icon: <FaGlobe className='text-2xl' />, value: 8, suffix: '', label: 'Cities Covered', color: 'text-green-500' },
    { icon: <FaUsers className='text-2xl' />, value: 2500, suffix: '+', label: 'Happy Clients', color: 'text-purple-500' },
    { icon: <FaTrophy className='text-2xl' />, value: 15, suffix: '+', label: 'Years Experience', color: 'text-amber-500' }
  ]

  return (
    <section className='max-padd-container py-16'>
      <div className='text-center mb-16'>
        <div className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 shadow-lg'>
          <FaCrown className='text-tertiary' />
          <span>About RealHomes SA</span>
        </div>
        
        <h2 className='h2 text-premium mb-4'>
          Your Trusted Partner in Premium South African Real Estate
        </h2>
        <p className='regular-16 text-neutral-600 max-w-3xl mx-auto'>
          With over 15 years of experience in the South African real estate market, we've built a reputation for excellence, 
          integrity, and exceptional service. Our commitment to innovation and client satisfaction sets us apart.
        </p>
      </div>

      {/* Stats Section */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'>
        {stats.map((stat, index) => (
          <div key={stat.label} className='text-center group'>
            <div className={`${stat.color} mb-4`}>
              {stat.icon}
            </div>
            <div className='text-3xl font-bold text-secondary mb-2'>
              {stat.value}{stat.suffix}
            </div>
            <div className='text-sm text-neutral-600 font-medium'>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className='mt-16 text-center'>
        <div className='bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200/30'>
          <div className='flex justify-center mb-6'>
            <div className='w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg'>
              <FaStar className='text-white text-2xl' />
            </div>
          </div>
          
          <blockquote className='text-xl text-neutral-700 mb-6 italic'>
            "RealHomes SA transformed our property search experience. Their expertise in the South African market 
            and commitment to client satisfaction is unmatched. We found our dream home within weeks!"
          </blockquote>
          
          <div className='text-center'>
            <div className='font-semibold text-secondary mb-1'>Sarah & Michael Johnson</div>
            <div className='text-sm text-neutral-600'>Cape Town, South Africa</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
