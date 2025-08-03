'use client'
import React from 'react'
import Item from './Item'
import { VscSettings } from 'react-icons/vsc'
import { Link } from "react-router-dom"
// import { PROPERTIES } from '../constant/data'
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
      <div>
        <span>Error while fetching data</span>
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
          color="#555"
          aria-label="puff-loading"
        />
      </div>

    )
  }

  // console.log(data);
  return (
    <section className='max-padd-container'>
      <div className='max-padd-container bg-primary py-16 xl:py-28 rounded-3xl'>
        <span className='medium-18'>Premium South African Properties</span>
        <h2 className='h2'>Discover Exceptional Homes Across South Africa</h2>
        <div className="flexBetween mt-8 mb-6">
          <h5><span className="font-bold">Showing 1-6</span> of premium properties</h5>
          <Link to={'/listing'}><VscSettings className="bg-white text-3xl rounded-md h-10 w-10 p-2 border" /></Link>
        </div>
        {/* container */}
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
      </div>
    </section >
  )
}

export default Properties