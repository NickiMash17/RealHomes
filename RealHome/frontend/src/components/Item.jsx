import React from 'react';
import { MdOutlineBed, MdOutlineBathtub, MdOutlineGarage } from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import HeartBtn from './HeartBtn';

const Item = ({ property }) => {
  const navigate = useNavigate();
  
  // Format price in Rands
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className='rounded-2xl p-5 bg-white' onClick={()=>navigate(`../listing/${property.id}`)}>
      <div className='pb-2 relative'>
        <img src={property.image} alt={property.title} className='rounded-xl' />
        {/* like btn */}
        <div className="absolute top-4 right-6">
          <HeartBtn id={property?.id}/>
        </div>
      </div>
      <h5 className='bold-16 my-1 text-secondary'>{property.city}</h5>
      <h4 className='medium-18 line-clamp-1'>{property.title}</h4>
      {/* info */}
      <div className='flex gap-x-2 py-2'>
        <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineBed /> {property.facilities.bedrooms}</div>
        <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineBathtub /> {property.facilities.bathrooms}</div>
        <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><MdOutlineGarage /> {property.facilities.parkings}</div>
        <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'><CgRuler /> {property.area}m²</div>
      </div>
      <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>
      <div className='flexBetween'>
        <div className='bold-20'>{formatPrice(property.price)}</div>
        <Link to={`/listing/${property.id}`}>
          <button className='btn-secondary rounded-xl !px-5 !py-[7px] shadow-sm'>View details</button>
        </Link>
      </div>
    </div>
  );
}

export default Item;
