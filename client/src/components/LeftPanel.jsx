import React from 'react'
import { FiEdit } from 'react-icons/fi'

const LeftPanel = ({ activeTab, setActiveTab }) => {
  return (
    <div className='h-screen w-full flex flex-col justify-between bg-white p-4 border-r border-green-200'>
      
      {/* Top: Profile */}
      <div className='flex flex-col items-center'>
        <div className='relative'>
          <img
            src="/download.jpg"
            alt="Profile"
            className='w-24 h-24 rounded-full border-2 border-green-400 object-cover'
          />
          <button className='absolute bottom-0 right-0 w-8 h-8 rounded-full bg-green-400 flex items-center justify-center hover:bg-green-500'>
            <FiEdit size={18} color='white' />
          </button>
        </div>
        <h2 className='mt-2 font-semibold text-black'>John Doe</h2>
      </div>

      {/* Optional Middle Section */}
      <div className='flex flex-col items-center my-4'>
        <p className='text-sm text-gray-500'>Welcome back!</p>
        {/* Could add stats or decorative icons here */}
      </div>

      {/* Bottom: Menu */}
      <div className='flex flex-col gap-3 w-full'>
        <button
          className={`w-full p-2 rounded text-black hover:bg-green-100 ${
            activeTab === 'Translation' ? 'font-semibold bg-green-200' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('Translation')}
        >
          Translation
        </button>
        <button
          className={`w-full p-2 rounded text-black hover:bg-green-100 ${
            activeTab === 'Settings' ? 'font-semibold bg-green-200' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('Settings')}
        >
          Settings
        </button>
        <button
          className={`w-full p-2 rounded text-black hover:bg-green-100 ${
            activeTab === 'History' ? 'font-semibold bg-green-200' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('History')}
        >
          History
        </button>
      </div>
    </div>
  )
}

export default LeftPanel
