import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Properties from '../components/Properties'
import RecentlyViewed from '../components/RecentlyViewed'
import PropertyRecommendations from '../components/PropertyRecommendations'
import bannerImg from '../assets/banner.png'
import Blogs from '../components/Blogs'
import Agents from '../components/Agents'
import SEO from '../components/SEO'
import OptimizedImage from '../components/OptimizedImage'

const Home = () => {
    return (
        <>
            <SEO
                title="RealHomes - Premium South African Real Estate"
                description="Discover luxury properties across South Africa. Browse premium homes, apartments, and estates in Cape Town, Johannesburg, Durban, and more. Your dream home awaits."
                keywords="real estate South Africa, luxury properties, Cape Town homes, Johannesburg apartments, Durban estates, property listings"
            />
            <main id="main-content" className="min-h-screen bg-white" tabIndex={-1}>
                <Hero />
                <About />
                <Properties />
                <PropertyRecommendations />
                <RecentlyViewed />
                <Blogs />
                <Agents />
            
            <div className='max-padd-container py-16 overflow-x-hidden'>
                <OptimizedImage 
                    src={bannerImg} 
                    alt="RealHomes - Premium Real Estate Platform" 
                    className="w-full"
                    loading="lazy"
                />
            </div>
        </main>
        </>
    )
}

export default Home