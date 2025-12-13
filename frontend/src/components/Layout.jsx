import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SkipToContent from './SkipToContent'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const Layout = () => { 
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <SkipToContent />
            <Header />
            <motion.main 
                id="main-content"
                className="pt-20 sm:pt-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Outlet />
            </motion.main>
            <Footer />
        </div>
    )
}

export default Layout