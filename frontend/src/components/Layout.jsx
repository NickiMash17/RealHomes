import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SkipToContent from './SkipToContent'
import { Outlet } from 'react-router-dom'

const Layout = () => { 
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <SkipToContent />
            <Header />
            <main 
                id="main-content"
                className="pt-16 sm:pt-20 md:pt-24"
            >
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout