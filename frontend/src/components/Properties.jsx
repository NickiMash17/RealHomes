'use client'
import React from 'react'
import Item from './Item'
import { VscSettings } from 'react-icons/vsc'
import { Link } from "react-router-dom"
import { FaCrown, FaMapMarkedAlt } from "react-icons/fa"
import useProperties from '../hooks/useProperties';
import { PuffLoader } from "react-spinners"
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Properties = () => {

  const { data, isError, isLoading } = useProperties();
  if (isError) {
    return (
      <div className='flexCenter h-64'>
        <div className='text-center'>
          <FaMapMarkedAlt className='text-4xl text-neutral-400 mx-auto mb-4' />
          <span className='text-neutral-600'>Error while fetching data</span>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='h-64 flexCenter'>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#1a365d"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  return (
    <section className='max-padd-container'>
      <div className='max-padd-container bg-gradient-to-br from-secondary/5 via-tertiary/5 to-accent/5 py-16 xl:py-28 rounded-3xl border border-luxury-gold/10'>
        {/* Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-platinum px-4 py-2 rounded-full text-secondary font-semibold text-sm mb-6'>
            <FaCrown />
            <span>Premium Properties</span>
          </div>
          <span className='medium-18 text-premium'>Exclusive South African Real Estate</span>
          <h2 className='h2'>Discover Exceptional Luxury Homes</h2>
          <p className='max-w-2xl mx-auto text-neutral-600 text-lg'>
            From oceanfront villas to prestigious estates, explore the finest properties that define luxury living across South Africa's most coveted locations.
          </p>
        </div>

        {/* Controls */}
        <div className="flexBetween mt-8 mb-6">
          <h5 className='text-neutral-700'>
            <span className="font-bold text-secondary">Showing 1-6</span> of premium properties
          </h5>
          <Link to={'/listing'} className='btn-secondary-outline rounded-xl'>
            <VscSettings className="text-xl" />
          </Link>
        </div>
        
        {/* Properties Carousel */}
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1124: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay]}
          className='h-[488px] md:h-[533px] xl:h-[422px] mt-5'
        >
          {data.slice(0, 6).map((property) => (
            <SwiperSlide key={property.title}>
              <Item property={property} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All Button */}
        <div className='text-center mt-12'>
          <Link to={'/listing'} className='btn-premium rounded-xl px-8 py-4'>
            View All Properties
          </Link>
        </div>
      </div>
    </section >
  )
}

export default Properties