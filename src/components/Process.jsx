import { motion } from 'framer-motion'
import Reveal from './Reveal'
import './Process.css'

const STEPS = [
  {
    n: '01',
    title: 'Map',
    desc: 'We audit your workflows and data, then pinpoint exactly where automation and software return the most leverage.',
  },
  {
    n: '02',
    title: 'Architect',
    desc: 'A lean technical blueprint — models, services, and integrations designed to scale n log n, not n².',
  },
  {
    n: '03',
    title: 'Build',
    desc: 'Rapid, iterative delivery. You see working systems in weeks, with tight feedback loops at every sprint.',
  },
  {
    n: '04',
    title: 'Scale',
    desc: 'We deploy, monitor, and tune in production — handing you autonomous systems that compound over time.',
  },
]

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">How we work</span>
          <h2 className="display section-title">
            A straight line from <span className="gradient-text">idea to impact</span>.
          </h2>
          <p className="lead">
            No bloated discovery phases. A focused, four-stage track that gets intelligent
            systems live — fast.
          </p>
        </Reveal>

        <div className="process-track">
          <div className="process-line" aria-hidden="true">
            <motion.span
              className="process-line__fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="process-grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12} className="process-step">
                <div className="process-step__node">
                  <span />
                </div>
                <div className="process-step__n">{s.n}</div>
                <h3 className="process-step__title">{s.title}</h3>
                <p className="process-step__desc">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
