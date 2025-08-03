import React from 'react';
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import HeartBtn from './HeartBtn';
import { FaMapMarkerAlt, FaCrown } from "react-icons/fa";

const Item = ({ property }) => {
  const navigate = useNavigate();
  
  // Format price in Rands with proper formatting
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `R${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `R${(price / 1000).toFixed(0)}K`;
    }
    return `R${price.toLocaleString()}`;
  };

  return (
    <div className='card-luxury p-6 group cursor-pointer' onClick={()=>navigate(`../listing/${property.id}`)}>
      <div className='pb-4 relative'>
        <img src={property.image} alt={property.title} className='rounded-xl w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300' />
        
        {/* Premium badge */}
        <div className="absolute top-4 left-4">
          <div className='bg-gradient-to-r from-luxury-gold to-luxury-platinum px-3 py-1 rounded-full text-secondary text-xs font-semibold flex items-center gap-1'>
            <FaCrown className='text-xs' />
            Premium
          </div>
        </div>
        
        {/* like btn */}
        <div className="absolute top-4 right-4">
          <HeartBtn id={property?.id}/>
        </div>
      </div>
      
      {/* Location */}
      <div className='flex items-center gap-2 mb-3'>
        <FaMapMarkerAlt className='text-tertiary text-sm' />
        <h5 className='bold-16 text-secondary'>{property.city}</h5>
      </div>
      
      {/* Title */}
      <h4 className='medium-18 line-clamp-1 mb-3 text-neutral-800 group-hover:text-secondary transition-colors'>{property.title}</h4>
      
      {/* Facilities */}
      <div className='flex gap-x-3 py-3 mb-4 bg-neutral-50 rounded-lg px-3'>
        <div className='flexCenter gap-x-1 text-neutral-600'>
          <MdOutlineBed className='text-tertiary' /> 
          <span className='text-sm font-medium'>{property.facilities.bedrooms}</span>
        </div>
        <div className='flexCenter gap-x-1 text-neutral-600'>
          <MdOutlineBathtub className='text-tertiary' /> 
          <span className='text-sm font-medium'>{property.facilities.bathrooms}</span>
        </div>
        <div className='flexCenter gap-x-1 text-neutral-600'>
          <MdOutlineGarage className='text-tertiary' /> 
          <span className='text-sm font-medium'>{property.facilities.parkings}</span>
        </div>
        <div className='flexCenter gap-x-1 text-neutral-600'>
          <CgRuler className='text-tertiary' /> 
          <span className='text-sm font-medium'>{property.area}m²</span>
        </div>
      </div>
      
      {/* Description */}
      <p className='pt-2 mb-4 line-clamp-2 text-neutral-600 text-sm leading-relaxed'>{property.description}</p>
      
      {/* Price and CTA */}
      <div className='flexBetween'>
        <div className='bold-20 text-luxury'>{formatPrice(property.price)}</div>
        <Link to={`/listing/${property.id}`}>
          <button className='btn-secondary rounded-xl !px-4 !py-2 text-sm shadow-lg hover:shadow-xl transition-all duration-300'>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Item;
