import React from 'react'
import {Link} from "react-router-dom"
import { FaMapMarkerAlt, FaSearch, FaStar } from "react-icons/fa"

const Hero = () => {
    return (
        <section className='max-padd-container pt-[99px] relative overflow-hidden'>
            {/* Background with gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-secondary/10 via-tertiary/5 to-accent/10 rounded-3xl'></div>
            
            {/* Main content */}
            <div className='relative z-10 max-padd-container bg-gradient-to-br from-white/95 to-neutral-50/95 backdrop-blur-sm h-[655px] w-full rounded-3xl border border-luxury-gold/20 shadow-xl'>
                <div className='relative top-32 xs:top-52 px-8'>
                    {/* Premium badge */}
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-platinum px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 shadow-lg'>
                        <FaStar className='text-tertiary' />
                        <span>Premium South African Real Estate</span>
                    </div>
                    
                    {/* Main heading */}
                    <h1 className='h1 text-premium mb-6'>
                        Discover Exceptional 
                        <span className='text-luxury'> Luxury Homes</span> 
                        Across South Africa
                    </h1>
                    
                    {/* Subtitle */}
                    <p className='my-8 max-w-[40rem] text-neutral-600 text-lg leading-relaxed'>
                        From the pristine beaches of Camps Bay to the prestigious estates of Stellenbosch, 
                        explore the finest properties that define luxury living in South Africa's most coveted locations.
                    </p>
                    
                    {/* Stats */}
                    <div className='flex flex-wrap gap-8 mb-8'>
                        <div className='flex items-center gap-3'>
                            <div className='w-3 h-3 bg-luxury-gold rounded-full'></div>
                            <span className='font-semibold text-secondary'>500+ Premium Properties</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-3 h-3 bg-tertiary rounded-full'></div>
                            <span className='font-semibold text-secondary'>15+ Years Experience</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <div className='w-3 h-3 bg-accent rounded-full'></div>
                            <span className='font-semibold text-secondary'>8 Major Cities</span>
                        </div>
                    </div>
                    
                    {/* CTA Section */}
                    <div className='flex flex-col sm:flex-row gap-6 items-start sm:items-center'>
                        <div className='card-premium p-6 max-w-sm'>
                            <div className='text-center regular-14 leading-tight'>
                                <h5 className='uppercase font-bold text-luxury mb-1'>Exclusive Offer</h5>
                                <p className='regular-14 text-neutral-600'>Free Property Valuation & Consultation</p>
                            </div>
                        </div>
                        <Link to={'/listing'} className={"btn-premium rounded-xl flexCenter !py-5 animate-fade-in"}>
                            <FaSearch className='mr-2' />
                            Explore Properties
                        </Link>
                    </div>
                    
                    {/* Location highlights */}
                    <div className='mt-12 flex flex-wrap gap-4'>
                        {['Cape Town', 'Johannesburg', 'Durban', 'Stellenbosch', 'Plettenberg Bay'].map((city, index) => (
                            <div key={city} className='flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300'>
                                <FaMapMarkerAlt className='text-tertiary text-sm' />
                                <span className='text-sm font-medium text-neutral-700'>{city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero