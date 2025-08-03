import React from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constant/data'
import { FaCrown, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className='max-padd-container mb-4'>
            <div className='max-padd-container bg-gradient-to-br from-white/95 to-neutral-50/95 backdrop-blur-sm rounded-3xl pt-8 sm:pt-12 xl:pt-20 pb-8 border border-amber-200/10'>
                <div className='flex flex-col items-center gap-6 sm:gap-8'>
                    {/* Premium badge */}
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-3 sm:px-4 py-2 rounded-full text-secondary font-semibold text-xs sm:text-sm mb-4 sm:mb-6'>
                        <FaStar className='text-tertiary' />
                        <span>Premium Real Estate</span>
                    </div>
                    
                    <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold text-secondary mb-3 sm:mb-4 text-center'>Ready to find your dream home in South Africa?</h3>
                    <p className='text-sm sm:text-base text-center max-w-[40rem] text-neutral-600 mb-6 sm:mb-8 px-4'>
                        Connect with our expert team and discover exceptional properties across South Africa's most prestigious locations.
                    </p>
                    
                    {/* Logo */}
                    <div className='flex items-center gap-x-2 mb-6 sm:mb-8'>
                        <FaCrown className='text-amber-500 text-xl sm:text-2xl' />
                        <span className='text-lg sm:text-xl lg:text-2xl font-bold text-secondary'>
                            Real<span className='text-amber-500'>Homes</span>
                            <span className='text-xs sm:text-sm text-neutral-500 ml-1 font-normal'>SA</span>
                        </span>
                    </div>
                </div>
                
                <hr className='my-6 sm:my-8 bg-neutral-300 h-[1px]' />
                
                {/* container */}
                <div className='flex flex-col lg:flex-row justify-between gap-8 px-4 sm:px-0'>
                    <div className='max-w-sm w-full'>
                        <Link to={'/'} className='flex items-center gap-x-2 mb-4 sm:mb-6'>
                            <FaCrown className='text-luxury-gold text-xl sm:text-2xl' />
                            <span className='font-[600] text-lg sm:text-xl lg:text-2xl text-secondary'>
                                Real<span className='text-luxury-gold'>Homes</span>
                                <span className='text-xs sm:text-sm text-neutral-500 ml-1 font-normal'>SA</span>
                            </span>
                        </Link>
                        <p className='py-4 text-neutral-600 leading-relaxed text-sm sm:text-base'>
                            Your trusted partner in South African real estate. We specialize in connecting discerning buyers with exceptional properties across the country's most prestigious locations, from the Atlantic seaboard to the Cape Winelands.
                        </p>
                        
                        {/* Subscribe Section - Mobile Responsive */}
                        <div className='mt-6'>
                            <h4 className='text-sm sm:text-base font-semibold text-secondary mb-3'>Subscribe to our newsletter</h4>
                            <div className='flex flex-col sm:flex-row gap-3'>
                                <input 
                                    type="email" 
                                    placeholder='Enter your email' 
                                    className='flex-1 px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/80 backdrop-blur-sm text-sm sm:text-base' 
                                />
                                <button className='btn-secondary rounded-lg px-6 py-3 text-sm sm:text-base font-medium whitespace-nowrap'>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex flex-col sm:flex-row justify-between flex-wrap gap-6 sm:gap-8'>
                        {FOOTER_LINKS.map((col) => (
                            <FooterColumn key={col.title} title={col.title}>
                                <ul className='flex flex-col gap-3 sm:gap-4 text-sm sm:text-base text-neutral-600'>
                                    {col.links.map((link) => (
                                        <Link to='/' key={link} className='hover:text-secondary transition-colors'>{link}</Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}
                        <div className='flex flex-col gap-5'>
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {FOOTER_CONTACT_INFO.links.map((link) => (
                                    <Link to='/' key={link.label} className='flex gap-3 sm:gap-4 items-start hover:text-secondary transition-colors'>
                                        {link.label === "Contact Number" ? <FaPhone className='text-tertiary mt-1' /> : <FaEnvelope className='text-tertiary mt-1' />}
                                        <div>
                                            <p className='text-neutral-500 text-xs sm:text-sm'>{link.label}:</p>
                                            <p className='font-semibold text-sm sm:text-base text-secondary'>{link.value}</p>
                                        </div>
                                    </Link>
                                ))}
                            </FooterColumn>
                        </div>
                        <div className='flex'>
                            <FooterColumn title={SOCIALS.title}>
                                <ul className='flex gap-3 sm:gap-4'>
                                    {SOCIALS.links.map((link) => (
                                        <Link to='/' key={link.id} className='text-lg sm:text-xl hover:text-secondary transition-colors hover:scale-110 transform duration-300'>{link.icon}</Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        </div>
                    </div>
                </div>
            </div>
            {/* copyrights */}
            <p className='text-white bg-gradient-to-r from-secondary to-tertiary text-xs sm:text-sm font-medium py-3 px-4 sm:px-8 rounded-b-3xl flex flex-col sm:flex-row justify-between items-center gap-2 shadow-lg'>
                <span>2024 RealHomes South Africa</span>
                <span>All rights reserved</span>
            </p>
        </footer>
    )
}

export default Footer


const FooterColumn = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-3 sm:gap-5'>
            <h4 className='font-semibold text-sm sm:text-base lg:text-lg whitespace-nowrap text-secondary'>{title}</h4>
            {children}
        </div>
    )
}