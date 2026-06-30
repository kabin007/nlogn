import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Concept from './components/Concept'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    document.documentElement.lang = 'en'
  }, [])

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="scroll-progress"
        aria-hidden="true"
      />
      <Navbar />
      <main>
        <Hero />
        <Concept />
        <Services />
        <Process />
        <Work />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
