import React, { useState } from 'react'
import { FaCrown, FaStar, FaUsers, FaHome, FaGlobe, FaTrophy, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const About = () => {
  const [activeTab, setActiveTab] = useState('mission')
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const stats = [
    { icon: <FaHome className='text-2xl' />, value: 500, suffix: '+', label: 'Properties Sold', color: 'text-blue-500' },
    { icon: <FaGlobe className='text-2xl' />, value: 8, suffix: '', label: 'Cities Covered', color: 'text-green-500' },
    { icon: <FaUsers className='text-2xl' />, value: 2500, suffix: '+', label: 'Happy Clients', color: 'text-purple-500' },
    { icon: <FaTrophy className='text-2xl' />, value: 15, suffix: '+', label: 'Years Experience', color: 'text-amber-500' }
  ]

  const tabs = [
    {
      id: 'mission',
      title: 'Our Mission',
      content: 'To provide exceptional real estate services that exceed expectations, delivering premium properties and personalized experiences to our valued clients across South Africa.',
      icon: <FaStar className='text-xl' />
    },
    {
      id: 'vision',
      title: 'Our Vision',
      content: 'To be the leading real estate platform in South Africa, known for innovation, integrity, and excellence in connecting people with their dream properties.',
      icon: <FaCrown className='text-xl' />
    },
    {
      id: 'values',
      title: 'Our Values',
      content: 'Integrity, Excellence, Innovation, and Client-Centric approach drive everything we do. We believe in building lasting relationships through trust and transparency.',
      icon: <FaTrophy className='text-xl' />
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className='max-padd-container py-16'>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className='text-center mb-16'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 shadow-lg'
        >
          <FaCrown className='text-tertiary' />
          <span>About RealHomes SA</span>
        </motion.div>
        
        <h2 className='h2 text-premium mb-4'>
          Your Trusted Partner in Premium South African Real Estate
        </h2>
        <p className='regular-16 text-neutral-600 max-w-3xl mx-auto'>
          With over 15 years of experience in the South African real estate market, we've built a reputation for excellence, 
          integrity, and exceptional service. Our commitment to innovation and client satisfaction sets us apart.
        </p>
      </motion.div>

      {/* Interactive Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className='text-center group'
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className={`${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {stat.icon}
            </motion.div>
            <div className='text-3xl font-bold text-secondary mb-2'>
              {inView && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2}
                  delay={index * 0.2}
                />
              )}
              {stat.suffix}
            </div>
            <div className='text-sm text-neutral-600 font-medium'>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='bg-gradient-to-br from-white to-neutral-50 rounded-3xl border border-amber-200/20 shadow-xl p-8'
      >
        {/* Tab Navigation */}
        <div className='flex flex-wrap justify-center gap-4 mb-8'>
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-secondary shadow-lg'
                  : 'bg-white/80 text-neutral-600 hover:bg-amber-50 border border-neutral-200'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className='text-center max-w-2xl mx-auto'
          >
            <div className='text-6xl text-amber-200 mb-4'>
              <FaQuoteLeft />
            </div>
            <p className='text-lg text-neutral-700 leading-relaxed mb-6'>
              {tabs.find(tab => tab.id === activeTab)?.content}
            </p>
            <div className='text-6xl text-amber-200'>
              <FaQuoteRight />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Testimonial Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className='mt-16 text-center'
      >
        <div className='bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200/30'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='flex justify-center mb-6'
          >
            <div className='w-20 h-20 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg'>
              <FaStar className='text-white text-2xl' />
            </div>
          </motion.div>
          
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className='text-xl text-neutral-700 mb-6 italic'
          >
            "RealHomes SA transformed our property search experience. Their expertise in the South African market 
            and commitment to client satisfaction is unmatched. We found our dream home within weeks!"
          </motion.blockquote>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className='text-center'
          >
            <div className='font-semibold text-secondary mb-1'>Sarah & Michael Johnson</div>
            <div className='text-sm text-neutral-600'>Cape Town, South Africa</div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
