import React from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constant/data'
import { FaCrown, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className='max-padd-container mb-4'>
            <div className='max-padd-container bg-gradient-to-br from-white/95 to-neutral-50/95 backdrop-blur-sm rounded-3xl pt-12 xl:pt-20 pb-8 border border-amber-200/10'>
                <div className='flex flex-col items-center gap-8'>
                    {/* Premium badge */}
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6'>
                        <FaStar className='text-tertiary' />
                        <span>Premium Real Estate</span>
                    </div>
                    
                    <h3 className='h3 text-premium mb-4'>Ready to find your dream home in South Africa?</h3>
                    <p className='regular-16 text-center max-w-[40rem] text-neutral-600 mb-8'>
                        Connect with our expert team and discover exceptional properties across South Africa's most prestigious locations.
                    </p>
                    
                    {/* Logo */}
                    <div className='flex items-center gap-x-2 mb-8'>
                        <FaCrown className='text-amber-500 text-2xl' />
                        <span className='bold-24 text-secondary'>
                            Real<span className='text-amber-500'>Homes</span>
                            <span className='text-sm text-neutral-500 ml-1 font-normal'>SA</span>
                        </span>
                    </div>
                </div>
                
                <hr className='my-8 bg-neutral-300 h-[1px]' />
                
                {/* container */}
                <div className='flex justify-between flex-wrap gap-8'>
                    <div className='max-w-sm'>
                        <Link to={'/'} className='flex items-center gap-x-2 mb-6'>
                            <FaCrown className='text-luxury-gold text-2xl' />
                            <span className='font-[600] bold-24 text-secondary'>
                                Real<span className='text-luxury-gold'>Homes</span>
                                <span className='text-sm text-neutral-500 ml-1 font-normal'>SA</span>
                            </span>
                        </Link>
                        <p className='py-4 text-neutral-600 leading-relaxed'>
                            Your trusted partner in South African real estate. We specialize in connecting discerning buyers with exceptional properties across the country's most prestigious locations, from the Atlantic seaboard to the Cape Winelands.
                        </p>
                        <div className='flexBetween pl-6 h-[3.3rem] bg-white/80 backdrop-blur-sm w-full max-w-[366px] rounded-full ring-1 ring-neutral-200 shadow-lg'>
                            <input type="email" placeholder='Enter your email' className='bg-transparent border-none outline-none flex-1 px-4' />
                            <button className='btn-secondary rounded-full relative right-[0.33rem] text-sm'>Subscribe</button>
                        </div>
                    </div>
                    <div className='flex justify-between flex-wrap gap-8'>
                        {FOOTER_LINKS.map((col) => (
                            <FooterColumn key={col.title} title={col.title}>
                                <ul className='flex flex-col gap-4 regular-14 text-neutral-600'>
                                    {col.links.map((link) => (
                                        <Link to='/' key={link} className='hover:text-secondary transition-colors'>{link}</Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}
                        <div className='flex flex-col gap-5'>
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {FOOTER_CONTACT_INFO.links.map((link) => (
                                    <Link to='/' key={link.label} className='flex gap-4 md:flex-col lg:flex-row items-center hover:text-secondary transition-colors'>
                                        {link.label === "Contact Number" ? <FaPhone className='text-tertiary' /> : <FaEnvelope className='text-tertiary' />}
                                        <div>
                                            <p className='text-neutral-500 text-sm'>{link.label}:</p>
                                            <p className='bold-15 text-secondary'>{link.value}</p>
                                        </div>
                                    </Link>
                                ))}
                            </FooterColumn>
                        </div>
                        <div className='flex '>
                            <FooterColumn title={SOCIALS.title}>
                                <ul className='flex gap-4'>
                                    {SOCIALS.links.map((link) => (
                                        <Link to='/' key={link.id} className='text-xl hover:text-secondary transition-colors hover:scale-110 transform duration-300'>{link.icon}</Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        </div>
                    </div>
                </div>
            </div>
            {/* copyrights */}
            <p className='text-white bg-gradient-to-r from-secondary to-tertiary medium-14 py-3 px-8 rounded-b-3xl flexBetween shadow-lg'>
                <span>2024 RealHomes South Africa</span>
                <span>All rights reserved</span>
            </p>
        </footer>
    )
}

export default Footer


const FooterColumn = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-5'>
            <h4 className='bold-18 whitespace-nowrap text-secondary'>{title}</h4>
            {children}
        </div>
    )
}