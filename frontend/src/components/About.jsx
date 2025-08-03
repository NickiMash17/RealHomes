import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import aboutImg from '../assets/about.jpg';
import { RiDoubleQuotesL } from "react-icons/ri";

const About = () => {
    // Define the statistics with South African focus
    const statistics = [
        { label: 'Properties Sold', value: 1250 },
        { label: 'Cities Covered', value: 8 },
        { label: 'Happy Clients', value: 890 }
    ];

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const top = aboutSection.getBoundingClientRect().top;
                const isVisible = top < window.innerHeight - 100;
                setIsVisible(isVisible);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Function to format numbers with commas
    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <section id='about' className='max-padd-container py-16 xl:py-28'>
            {/* Container */}
            <div className='flex flex-col xl:flex-row gap-10'>
                {/* Left side */}
                <div className='flex-1 relative'>
                    <img src={aboutImg} alt="" className='rounded-3xl rounded-tr-[155px] w-[488px]' />
                    <div className='bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg flexCenter flex-col'>
                        <span className='relative bottom-8 p-3 shadow-md bg-white h-12 w-12 flex items-center rounded-full'><RiDoubleQuotesL className='text-2xl'/></span>
                        <p className='text-center relative bottom-3'>"RealHomes helped us find our dream home in Cape Town. Exceptional service and local expertise!"</p>
                    </div>
                </div>
                {/* Right side */}
                <div className='flex-1 flex justify-center flex-col'>
                    <span className='medium-18'>About RealHomes South Africa</span>
                    <h2 className='h2'>Your Trusted Partner in South African Real Estate</h2>
                    <p className='py-5'>With over 15 years of experience in the South African property market, we specialize in connecting buyers with exceptional properties across the country. From luxury villas in Camps Bay to modern apartments in Sandton, our expert team provides personalized service and deep local market knowledge to ensure you find your perfect home.</p>
                    {/* Statistics Container */}
                    <div className="flex flex-wrap gap-4">
                        {statistics.map((statistic, index) => (
                            <div key={index} className="bg-primary p-4 rounded-lg">
                                <div className='flex items-center gap-1'>
                                    <CountUp start={isVisible ? 0 : null} end={statistic.value} duration={10} delay={3}>
                                        {({ countUpRef }) => (
                                            <h3 ref={countUpRef} className="text-2xl font-semibold "></h3>
                                        )}
                                    </CountUp>
                                    <h4 className='bold-22'>+</h4>
                                </div>
                                <p className="text-gray-600">{statistic.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
