import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import aboutImg from '../assets/about.jpg';
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaTrophy, FaUsers, FaMapMarkedAlt } from "react-icons/fa";

const About = () => {
    // Define the statistics with South African focus
    const statistics = [
        { 
            label: 'Properties Sold', 
            value: 1250,
            icon: <FaTrophy className="text-luxury-gold text-2xl" />,
            description: 'Premium properties across South Africa'
        },
        { 
            label: 'Cities Covered', 
            value: 8,
            icon: <FaMapMarkedAlt className="text-tertiary text-2xl" />,
            description: 'From Cape Town to Johannesburg'
        },
        { 
            label: 'Happy Clients', 
            value: 890,
            icon: <FaUsers className="text-accent text-2xl" />,
            description: 'Satisfied luxury property buyers'
        }
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

    return (
        <section id='about' className='max-padd-container py-16 xl:py-28'>
            {/* Container */}
            <div className='flex flex-col xl:flex-row gap-10'>
                {/* Left side */}
                <div className='flex-1 relative'>
                    <div className='relative'>
                        <img src={aboutImg} alt="" className='rounded-3xl rounded-tr-[155px] w-[488px] shadow-xl' />
                        <div className='absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent rounded-3xl rounded-tr-[155px]'></div>
                    </div>
                    <div className='card-luxury absolute bottom-16 left-16 max-w-xs p-6'>
                        <span className='relative bottom-8 p-3 shadow-lg bg-white h-12 w-12 flex items-center rounded-full mx-auto'>
                            <RiDoubleQuotesL className='text-2xl text-luxury-gold'/>
                        </span>
                        <p className='text-center relative bottom-3 text-neutral-700 italic'>
                            "RealHomes helped us find our dream villa in Camps Bay. Exceptional service and deep local expertise!"
                        </p>
                        <p className='text-center text-sm text-neutral-500 mt-2'>- Sarah & Michael Johnson</p>
                    </div>
                </div>
                
                {/* Right side */}
                <div className='flex-1 flex justify-center flex-col'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-platinum px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6 w-fit'>
                        <FaTrophy />
                        <span>Trusted by South Africa's Elite</span>
                    </div>
                    
                    <span className='medium-18 text-premium'>About RealHomes South Africa</span>
                    <h2 className='h2'>Your Trusted Partner in Premium South African Real Estate</h2>
                    <p className='py-5 text-lg leading-relaxed'>
                        With over 15 years of experience in South Africa's luxury property market, we specialize in connecting discerning buyers with exceptional properties across the country's most prestigious locations. From the Atlantic seaboard to the Cape Winelands, our expert team provides personalized service and deep local market knowledge.
                    </p>
                    
                    {/* Statistics Container */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {statistics.map((statistic, index) => (
                            <div key={index} className="card-premium p-6 text-center group hover:scale-105 transition-all duration-300">
                                <div className='flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                                    {statistic.icon}
                                </div>
                                <div className='flex items-center justify-center gap-1 mb-2'>
                                    <CountUp start={isVisible ? 0 : null} end={statistic.value} duration={2} delay={index * 0.2}>
                                        {({ countUpRef }) => (
                                            <h3 ref={countUpRef} className="text-3xl font-bold text-secondary"></h3>
                                        )}
                                    </CountUp>
                                    <h4 className='bold-22 text-secondary'>+</h4>
                                </div>
                                <p className="font-semibold text-secondary mb-1">{statistic.label}</p>
                                <p className="text-sm text-neutral-600">{statistic.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
