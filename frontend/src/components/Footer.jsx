import React from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constant/data'

const Footer = () => {
    return (
        <footer className='max-padd-container mb-4'>
            <div className='max-padd-container bg-primary rounded-tr-3xl rounded-tl-3xl pt-12 xl:pt-20 pb-8'>
                <h3 className='h3'>Ready to find your dream home in South Africa?</h3>
                <p>Connect with our expert team and discover exceptional properties across the country.</p>
                <hr className='my-8 bg-slate-900/30 h-[2px]' />
                {/* container */}
                <div className='flex justify-between flex-wrap gap-2
                '>
                    <div className='max-w-sm'>
                        <Link to={'/'} className='flex items-center gap-x-2'>
                        <span className='font-[600] bold-24  text-secondary'>Real<span className=' text-tertiary'>Homes</span><span className='text-sm text-gray-500 ml-1'>SA</span></span>
                        </Link>
                        <p className='py-4'>Your trusted partner in South African real estate. We specialize in connecting buyers with exceptional properties across the country's most prestigious locations.</p>
                        <div className='flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5'>
                            <input type="email" placeholder='Enter your email' className='bg-transparent border-none outline-none' />
                            <button className='btn-secondary rounded-full relative right-[0.33rem]'>Subscribe</button>
                        </div>
                    </div>
                    <div className='flex justify-between flex-wrap gap-8'>
                        {FOOTER_LINKS.map((col) => (
                            <FooterColumn key={col.title} title={col.title}>
                                <ul className='flex flex-col gap-4 regular-14 text-gray-20'>
                                    {col.links.map((link) => (
                                        <Link to='/' key={link}>{link}</Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        ))}
                        <div className='flex flex-col gap-5'>
                            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                                {FOOTER_CONTACT_INFO.links.map((link) => (
                                    <Link to='/' key={link.label} className='flex gap-4 md:flex-col lg:flex-row'>
                                        <p>{link.label}:</p><p className='bold-15'>{link.value}</p>
                                    </Link>
                                ))}
                            </FooterColumn>
                        </div>
                        <div className='flex '>
                            <FooterColumn title={SOCIALS.title}>
                                <ul className='flex gap-4'>
                                    {SOCIALS.links.map((link) => (
                                        <Link to='/' key={link.id} className='text-xl'>{link.icon}</Link>
                                    ))}
                                </ul>
                            </FooterColumn>
                        </div>
                    </div>
                </div>
            </div>
            {/* copyrights */}
            <p className='text-white bg-tertiary medium-14 py-2 px-8 rounded-b-3xl flexBetween '><span>2024 RealHomes South Africa</span><span>All rights reserved</span></p>
        </footer>
    )
}

export default Footer


const FooterColumn = ({ title, children }) => {
    return (
        <div className='flex flex-col gap-5'>
            <h4 className='bold-18 whitespace-nowrap'>{title}</h4>
            {children}
        </div>
    )
}