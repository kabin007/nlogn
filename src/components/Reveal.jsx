import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/* Scroll-triggered entrance. Wraps children; honors reduced-motion via Framer. */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  className = '',
  as = 'div',
  once = true,
  amount = 0.3,
}) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </M>
  )
}
