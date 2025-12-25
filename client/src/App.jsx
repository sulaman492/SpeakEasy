import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Translation from './components/Translation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Homepage/> */}
      <Navbar/>
      <HeroSection/>
      <Translation/>
    </>
  )
}

export default App
