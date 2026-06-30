import { motion } from 'framer-motion'
import './Logo.css'

/*
  Faithful recreation of the NLOGN identity.

  - <LogoMark />  : the twin italic "N" glyphs joined by the three-node bridge
  - <Wordmark />  : "NLOGN" set in Syncopate with the custom blue "O" node
  - <Logo />      : full lockup (mark + wordmark + tagline) used in the hero
*/

/* A single aggressive, sheared racing "N" built from three parallelograms. */
function SpeedN({ flip = false }) {
  return (
    <g transform={flip ? 'scale(-1,1) translate(-124,0)' : undefined}>
      {/* left post */}
      <polygon points="26,4 48,4 32,116 10,116" />
      {/* diagonal slash */}
      <polygon points="40,4 60,4 98,116 78,116" />
      {/* right post */}
      <polygon points="92,4 114,4 98,116 76,116" />
    </g>
  )
}

export function LogoMark({ className = '', animated = false }) {
  const Dot = motion.rect
  const dotProps = (i) =>
    animated
      ? {
          initial: { opacity: 0.25 },
          animate: { opacity: [0.25, 1, 0.25] },
          transition: {
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.18,
            ease: 'easeInOut',
          },
        }
      : {}

  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox="0 0 360 124"
      role="img"
      aria-label="NLOGN mark"
      fill="currentColor"
    >
      {/* left N */}
      <SpeedN />
      {/* node bridge — three blue dots, sheared to match the italic */}
      <g transform="skewX(-12)" fill="var(--blue)">
        <Dot x="148" y="54" width="15" height="15" rx="3.5" {...dotProps(0)} />
        <Dot x="178" y="54" width="15" height="15" rx="3.5" {...dotProps(1)} />
        <Dot x="208" y="54" width="15" height="15" rx="3.5" {...dotProps(2)} />
      </g>
      {/* right (mirrored) N */}
      <g transform="translate(236,0)">
        <SpeedN flip />
      </g>
    </svg>
  )
}

export function Wordmark({ className = '' }) {
  return (
    <div className={`wordmark ${className}`} aria-label="NLOGN">
      <span>N</span>
      <span>L</span>
      <span className="word-o" aria-hidden="true">
        <i />
      </span>
      <span>G</span>
      <span>N</span>
    </div>
  )
}

export default function Logo({ animated = true }) {
  return (
    <div className="logo-lockup">
      <LogoMark animated={animated} />
      <Wordmark />
      <div className="logo-tagline">
        <span>AI Automation</span>
        <em />
        <span>Software Development</span>
      </div>
    </div>
  )
}
