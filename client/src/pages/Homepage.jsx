import React from 'react'
import { useState } from 'react'
import LeftPanel from '../components/LeftPanel'
import RightPanel from '../components/RightPanel'

const Homepage = () => {
    const [activeTab, setActiveTab] = useState("Translation")
    return (
    <div className=' h-screen w-screen flex justify-between'> 
    {/* left */}
        <div className='w-1/4'>
            <LeftPanel activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>

        <div className='w-full border border-blue-900'>
            <RightPanel/>
        </div>

    </div>
  )
}

export default Homepage
