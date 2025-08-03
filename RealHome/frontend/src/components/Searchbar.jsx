import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const Searchbar = ({filter, setFilter}) => {
    return (
        <div className='flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-slate-500/5'>
            <input type="text" value={filter} onChange={(e)=> setFilter(e.target.value)} placeholder='Enter an address or city' className='bg-transparent border-none outline-none' />
            <FaLocationDot className='relative right-4 text-xl hover:text-secondary' />
        </div>
    )
}

export default Searchbar