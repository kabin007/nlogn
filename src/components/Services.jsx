import { motion } from 'framer-motion'
import Reveal from './Reveal'
import {
  IconBot,
  IconCode,
  IconWorkflow,
  IconChart,
  IconCloud,
  IconShield,
} from './icons'
import './Services.css'

const SERVICES = [
  {
    icon: IconBot,
    title: 'AI Automation',
    desc: 'Custom agents and copilots that take over repetitive operations — support, ops, data entry — running 24/7.',
    tags: ['LLM Agents', 'RAG', 'Copilots'],
    featured: true,
  },
  {
    icon: IconCode,
    title: 'Software Development',
    desc: 'Production web, mobile, and backend systems engineered to scale — clean architecture, shipped fast.',
    tags: ['Web', 'APIs', 'Mobile'],
  },
  {
    icon: IconWorkflow,
    title: 'Workflow Orchestration',
    desc: 'Event-driven pipelines that connect your tools and route work automatically across the whole stack.',
    tags: ['Pipelines', 'Integrations'],
  },
  {
    icon: IconChart,
    title: 'Data & Analytics',
    desc: 'From raw events to dashboards and predictions — the data backbone behind every smart decision.',
    tags: ['ETL', 'Dashboards', 'ML'],
  },
  {
    icon: IconCloud,
    title: 'Cloud & DevOps',
    desc: 'Infrastructure as code, CI/CD, and observability so your systems ship safely and stay up.',
    tags: ['IaC', 'CI/CD', 'Observability'],
  },
  {
    icon: IconShield,
    title: 'AI Strategy & Audit',
    desc: 'Where automation actually pays off — a clear roadmap, risk review, and ROI model before you build.',
    tags: ['Roadmap', 'ROI', 'Risk'],
  },
]

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Capabilities</span>
          <h2 className="display section-title">
            One team, the whole <span className="gradient-text">build pipeline</span>.
          </h2>
          <p className="lead">
            From the first model to the last deploy — NLOGN owns the path from idea to a
            system running in production.
          </p>
        </Reveal>

        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal
                key={s.title}
                delay={(i % 3) * 0.1}
                className={`service-wrap ${s.featured ? 'service-wrap--featured' : ''}`}
              >
                <motion.article
                  className={`card service ${s.featured ? 'service--featured' : ''}`}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <div className="service__icon">
                    <Icon />
                  </div>
                  <h3 className="service__title">{s.title}</h3>
                  <p className="service__desc">{s.desc}</p>
                  <div className="service__tags">
                    {s.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
