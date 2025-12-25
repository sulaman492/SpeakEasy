import React from 'react'
import { FaGlobe } from "react-icons/fa";        
import { AiFillStar } from "react-icons/ai"; 
import { IoFlash } from "react-icons/io5";       
import { MdAutoAwesome } from "react-icons/md";  

const HeroSection = () => {
  return (
    <div className='w-screen bg-[#F7F8FA] flex flex-col items-center justify-start pt-16 px-6'>
      
      {/* Top Badge */}
      <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6'>
        <AiFillStar className='text-[#24B4C6] text-lg' />
        <span className='text-sm font-medium text-gray-800'>AI-Powered Translation</span>
      </div>

      {/* Main Heading */}
      <div className='flex flex-col items-center text-center gap-4 mb-6'>
        <p className='font-bold text-6xl text-gray-900 font-sans'>Break Language</p>
        <p className='font-bold text-6xl font-sans bg-clip-text text-transparent bg-gradient-to-r from-[#434BDD] to-[#9F43D8]'>
          Barriers Instantly
        </p>
        <p className='text-gray-400 text-lg max-w-2xl'>
          Translate text seamlessly across 100+ languages with our intelligent translation engine. Fast, accurate, and always learning.
        </p>
      </div>

      {/* Feature Buttons */}
      <div className='flex gap-4 mt-6'>
        <button className='flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition'>
          <FaGlobe className='text-[#434BDD]' /> 100+ Languages
        </button>
        <button className='flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition'>
          <IoFlash className='text-[#24B4C6]' /> Instant Results
        </button>
        <button className='flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition'>
          <MdAutoAwesome className='text-[#434BDD]' /> AI-Enhanced
        </button>
      </div>
    </div>
  )
}

export default HeroSection
