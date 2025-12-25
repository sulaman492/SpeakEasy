import React from 'react'

const Navbar = () => {
  return (
    <div className='w-screen flex justify-between items-center bg-[#FEFEFE]  p-4'>
      {/* Logo */}
      <div>
        <p className='text-black font-bold text-2xl tracking-wider font-sans'>
          SpeakEasy
        </p>
      </div>

      {/* Links */}
      <div>
        <ul className='flex gap-8'>
          <li className='cursor-pointer text-gray-500 hover:text-black transition-all duration-300 font-medium tracking-wide'>
            Features
          </li>
          <li className='cursor-pointer text-gray-500 hover:text-black transition-all duration-300 font-medium tracking-wide'>
            Pricing
          </li>
          <li className='cursor-pointer text-gray-500 hover:text-black transition-all duration-300 font-medium tracking-wide'>
            API
          </li>
          <li className='cursor-pointer text-gray-500 hover:text-black transition-all duration-300 font-medium tracking-wide'>
            About
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className='flex gap-5'>
        {/* Sign In Button */}
        <button className="
          cursor-pointer
          text-black 
          bg-transparent
          px-5 py-2 
          rounded-full 
          font-semibold 
          shadow-md 
          border border-gray-300
          transition-all 
          duration-300 
          ease-in-out  
          hover:bg-[#24B4C6]
          hover:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-green-500
        ">
          Sign In
        </button>

        {/* Get Started Button */}
        <button className="
          cursor-pointer
          text-white 
          bg-gradient-to-r 
          from-[#434BDD] 
          to-[#9F43D8] 
          px-5 py-2 
          rounded-full 
          font-semibold 
          shadow-lg 
          transition-all 
          duration-300 
          ease-in-out 
          hover:brightness-110
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-[#434BDD]
        ">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Navbar

