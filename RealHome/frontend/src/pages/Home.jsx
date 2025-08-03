import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Properties from '../components/Properties'
import bannerImg from '../assets/banner.png'
import Blogs from '../components/Blogs'
import Agents from '../components/Agents'


const Home = () => {
    return (
        <main>
            <Hero />
            <About />
            <Properties />
            <Blogs/>
            <Agents />
            <div className='max-padd-container py-16 overflow-x-hidden'>
                <img src={bannerImg} alt="" />
            </div>
        </main>
    )
}

export default Home