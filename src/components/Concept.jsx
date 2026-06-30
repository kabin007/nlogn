import { motion } from 'framer-motion'
import Reveal from './Reveal'
import './Concept.css'

/* The three concept marks, rebuilt as SVG to match the brand board exactly. */

function TwoNs() {
  return (
    <svg viewBox="0 0 120 64" className="concept-glyph" aria-hidden="true">
      <g fill="#fff">
        <polygon points="6,6 16,6 11,58 1,58" transform="skewX(-12)" />
        <polygon points="12,6 21,6 33,58 24,58" transform="skewX(-12)" />
        <polygon points="29,6 39,6 34,58 24,58" transform="skewX(-12)" />
      </g>
      <line x1="60" y1="8" x2="60" y2="56" stroke="var(--blue)" strokeWidth="3" />
      <g fill="#fff" transform="translate(118,0) scale(-1,1)">
        <polygon points="6,6 16,6 11,58 1,58" transform="skewX(-12)" />
        <polygon points="12,6 21,6 33,58 24,58" transform="skewX(-12)" />
        <polygon points="29,6 39,6 34,58 24,58" transform="skewX(-12)" />
      </g>
    </svg>
  )
}

function Bridge() {
  return (
    <svg viewBox="0 0 120 64" className="concept-glyph" aria-hidden="true">
      <g fill="var(--blue)" transform="skewX(-22)">
        <rect x="34" y="18" width="13" height="28" rx="2" />
        <rect x="56" y="18" width="13" height="28" rx="2" />
        <rect x="78" y="18" width="13" height="28" rx="2" />
      </g>
    </svg>
  )
}

function Nodes() {
  return (
    <svg viewBox="0 0 120 64" className="concept-glyph" aria-hidden="true">
      <g fill="none" stroke="var(--blue)" strokeWidth="3">
        <rect x="22" y="20" width="22" height="24" rx="3" />
        <rect x="49" y="20" width="22" height="24" rx="3" />
        <rect x="76" y="20" width="22" height="24" rx="3" />
      </g>
    </svg>
  )
}

const PILLARS = [
  {
    glyph: <TwoNs />,
    title: "Two N's",
    lead: 'Two ends. Endless possibilities.',
    body: 'Strategy meets execution. We connect where you are today to where your product needs to be — and keep the bridge open.',
  },
  {
    glyph: <Bridge />,
    title: 'The Bridge',
    lead: 'Logic. Automation. Transformation.',
    body: 'Intelligent pipelines that turn manual, repetitive operations into self-running systems — measurable, observable, and fast.',
  },
  {
    glyph: <Nodes />,
    title: 'The Nodes',
    lead: 'AI Workflows. Data. Systems. Processes.',
    body: 'Composable AI agents and services wired into your stack, orchestrating data and decisions across the whole operation.',
  },
]

export default function Concept() {
  return (
    <section className="section concept" id="concept">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">The Concept</span>
          <h2 className="display section-title">
            A name that is also <span className="gradient-text">the architecture</span>.
          </h2>
          <p className="lead">
            <span className="mono-accent">NLOGN</span> — the signature of efficient
            algorithms. It is how we think about every system we build: maximum leverage,
            minimum waste.
          </p>
        </Reveal>

        <div className="concept-grid">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="concept-card-wrap">
              <motion.article
                className="card concept-card"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="concept-card__glyph">{p.glyph}</div>
                <div className="concept-card__index">0{i + 1}</div>
                <h3 className="concept-card__title">{p.title}</h3>
                <p className="concept-card__lead">{p.lead}</p>
                <p className="concept-card__body">{p.body}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
