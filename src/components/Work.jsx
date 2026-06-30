import { motion } from 'framer-motion'
import Reveal from './Reveal'
import './Work.css'

const PROJECTS = [
  {
    tag: 'AI Automation',
    title: 'Autonomous Support Desk',
    metric: '82%',
    metricLabel: 'tickets auto-resolved',
    desc: 'A multi-agent system that triages, drafts, and resolves customer tickets across channels.',
  },
  {
    tag: 'Software',
    title: 'Logistics Control Tower',
    metric: '3.4x',
    metricLabel: 'faster dispatch',
    desc: 'Real-time fleet orchestration platform handling 12k events per minute.',
  },
  {
    tag: 'Data / ML',
    title: 'Demand Forecast Engine',
    metric: '−37%',
    metricLabel: 'inventory waste',
    desc: 'Forecasting pipeline feeding live procurement decisions for a retail network.',
  },
]

const MARQUEE = [
  'OpenAI',
  'Anthropic',
  'React',
  'Next.js',
  'Python',
  'PostgreSQL',
  'Kubernetes',
  'AWS',
  'LangChain',
  'TypeScript',
  'Vector DB',
  'Rust',
]

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Selected Work</span>
          <h2 className="display section-title">
            Systems already <span className="gradient-text">running fast</span>.
          </h2>
          <p className="lead">
            A few of the engines we've shipped. Numbers measured in production, not slides.
          </p>
        </Reveal>

        <div className="work-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.article
                className="card work-card"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <div className="work-card__top">
                  <span className="work-card__tag">{p.tag}</span>
                  <div className="work-card__metric">
                    <strong>{p.metric}</strong>
                    <span>{p.metricLabel}</span>
                  </div>
                </div>
                <div className="work-card__viz" aria-hidden="true">
                  <Bars />
                </div>
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__desc">{p.desc}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="marquee__item">
              {m}
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* abstract animated equalizer-style viz */
function Bars() {
  const heights = [40, 70, 30, 90, 55, 75, 45, 85, 35, 65]
  return (
    <div className="work-bars">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: '12%' }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}
