import { motion } from 'framer-motion'
import Logo from './Logo'
import SpeedStreaks from './SpeedStreaks'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: 0.15 + i * 0.12 },
  }),
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <SpeedStreaks />
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="container hero__inner">
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <span className="pulse-dot" />
          AI Automation · Software Development
        </motion.div>

        <motion.div
          className="hero__logo"
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease }}
        >
          <Logo />
        </motion.div>

        <motion.h1
          className="hero__headline display"
          variants={rise}
          custom={0}
          initial="hidden"
          animate="show"
        >
          We engineer intelligent systems
          <br />
          that scale <span className="gradient-text">n&nbsp;log&nbsp;n</span>.
        </motion.h1>

        <motion.p
          className="hero__sub lead"
          variants={rise}
          custom={1}
          initial="hidden"
          animate="show"
        >
          NLOGN builds AI automation and production software for teams who refuse to
          slow down. Two ends. Endless possibilities — connected by logic.
        </motion.p>

        <motion.div
          className="hero__actions"
          variants={rise}
          custom={2}
          initial="hidden"
          animate="show"
        >
          <a href="#contact" className="btn btn-primary">
            Start a Project
            <Arrow />
          </a>
          <a href="#services" className="btn btn-ghost">
            Explore Capabilities
          </a>
        </motion.div>

        <motion.div
          className="hero__stats"
          variants={rise}
          custom={3}
          initial="hidden"
          animate="show"
        >
          {[
            ['40+', 'Systems shipped'],
            ['3.2x', 'Avg. throughput gain'],
            ['<100ms', 'Inference latency'],
            ['24/7', 'Autonomous workflows'],
          ].map(([n, l]) => (
            <div className="hero__stat" key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#concept"
        className="hero__scroll"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </motion.a>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
