import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaYoutube, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp,
  FaArrowUp,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaHome,
  FaStar,
  FaCrown,
  FaCheckCircle,
  FaClock,
  FaGlobe
} from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaYoutube, href: '#', label: 'YouTube' }
  ]

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/listing', label: 'Properties' },
    { to: '/contact', label: 'Contact' },
    { to: '/favourites', label: 'Favorites' },
    { to: '/bookings', label: 'Bookings' },
    { to: '/addproperty', label: 'List Property' }
  ]

  const popularAreas = [
    { to: '/listing?city=cape-town', label: 'Cape Town' },
    { to: '/listing?city=johannesburg', label: 'Johannesburg' },
    { to: '/listing?city=durban', label: 'Durban' },
    { to: '/listing?city=stellenbosch', label: 'Stellenbosch' },
    { to: '/listing?city=pretoria', label: 'Pretoria' },
    { to: '/listing?city=plettenberg-bay', label: 'Plettenberg Bay' }
  ]

  const trustIndicators = [
    { icon: FaShieldAlt, text: 'Licensed & Regulated', color: 'text-amber-400' },
    { icon: FaAward, text: '15+ Years Experience', color: 'text-amber-400' },
    { icon: FaUsers, text: '500+ Happy Clients', color: 'text-amber-400' },
    { icon: FaStar, text: 'Premium Service', color: 'text-amber-400' }
  ]

  return (
    <footer className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 hidden lg:block"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <FaCrown className="w-6 h-6 text-amber-400" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-20 hidden lg:block"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <FaHome className="w-6 h-6 text-amber-400" />
        </div>
      </motion.div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-padd-container py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">R</span>
                  </div>
                  <div>
                    <span className="text-3xl font-bold">RealHomes</span>
                    <p className="text-xs text-amber-400 font-medium">Premium Properties</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed mb-8 text-lg">
                  Premium South African real estate platform connecting discerning buyers with exceptional properties across the country's most coveted locations.
                </p>
                
                {/* Trust Indicators */}
                <div className="space-y-4">
                  {trustIndicators.map((indicator, index) => (
                    <motion.div 
                      key={indicator.text}
                      className="flex items-center gap-3 text-white/90"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <indicator.icon className={`${indicator.color} text-lg`} />
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <FaGlobe className="text-amber-400" />
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link 
                      to={link.to} 
                      className="text-white/80 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FaArrowUp className="w-3 h-3 rotate-45 group-hover:translate-x-1 transition-transform duration-300" />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Popular Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-400" />
                Popular Areas
              </h3>
              <ul className="space-y-4">
                {popularAreas.map((area, index) => (
                  <motion.li
                    key={area.to}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <Link 
                      to={area.to} 
                      className="text-white/80 hover:text-amber-400 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <FaMapMarkerAlt className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                      {area.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <FaPhone className="text-amber-400" />
                Contact Us
              </h3>
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
                    <FaPhone className="text-amber-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <a href="tel:+27112345678" className="text-white hover:text-amber-400 transition-colors font-medium">
                      +27 11 234 5678
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
                    <FaWhatsapp className="text-amber-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">WhatsApp</p>
                    <a href="https://wa.me/27112345678" className="text-white hover:text-amber-400 transition-colors font-medium">
                      +27 11 234 5678
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
                    <FaEnvelope className="text-amber-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <a href="mailto:info@realhomes.co.za" className="text-white hover:text-amber-400 transition-colors font-medium">
                      info@realhomes.co.za
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
                    <FaMapMarkerAlt className="text-amber-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Address</p>
                    <p className="text-white text-sm font-medium">
                      123 Sandton Drive<br />
                      Sandton, Johannesburg<br />
                      South Africa
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-white/20"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-white/80 text-lg">Get the latest property updates and exclusive offers</p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-xl text-secondary focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
                />
                <motion.button 
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-secondary font-bold rounded-xl hover:shadow-glow transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
              
              <AnimatePresence>
                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 text-center"
                  >
                    <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg">
                      <FaCheckCircle />
                      <span>Successfully subscribed!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-padd-container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="text-white/80 text-sm">
                © {currentYear} RealHomes South Africa. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-white/80 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/80 hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-white/80 hover:text-amber-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-600 to-yellow-500 text-white rounded-2xl shadow-2xl hover:shadow-glow transition-all duration-300 z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <FaArrowUp className="w-6 h-6 mx-auto" />
      </motion.button>
    </footer>
  )
}

export default Footer