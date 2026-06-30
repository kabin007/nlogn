import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoMark } from './Logo'
import './Navbar.css'

const LINKS = [
  { label: 'Concept', href: '#concept' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="NLOGN home">
          <LogoMark />
          <span className="nav__brand-name">NLOGN</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-primary nav__cta">
          Start a Project
        </a>

        <button
          className="nav__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={{ transform: open ? 'translateY(5px) rotate(45deg)' : '' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'translateY(-5px) rotate(-45deg)' : '' }} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              Start a Project
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
