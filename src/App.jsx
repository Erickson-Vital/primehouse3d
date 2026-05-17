import { useState } from 'react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Catalog from './components/Catalog'
import HowItWorks from './components/HowItWorks'
import Stats from './components/Stats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Catalog />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
