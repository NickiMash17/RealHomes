import React from 'react'
import {Link} from "react-router-dom"

const Hero = () => {
    return (
        <section className='max-padd-container pt-[99px]'>
            <div className='max-padd-container bg-hero bg-center bg-no-repeat bg-cover h-[655px] w-full rounded-3xl'>
                <div className='relative top-32 xs:top-52 '>
                    <span className='medium-18'>Welcome to RealHomes South Africa</span>
                    <h1 className='h1 capitalize max-w-[40rem] '>Discover Your Dream Home in South Africa</h1>
                    <p className='my-10 max-w-[33rem]'>From luxury villas in Camps Bay to modern apartments in Sandton, find your perfect property across South Africa's most prestigious locations.</p>
                    {/* button */}
                    <div className='inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl'>
                        <div className='text-center regular-14 leading-tight pl-5'>
                            <h5 className='uppercase font-bold'>Special Offer</h5>
                            <p className='regular-14'>Free Property Valuation</p>
                        </div>
                        <Link to={'/listing'} className={"btn-secondary rounded-xl flexCenter !py-5"}>Browse Properties</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero