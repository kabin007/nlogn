import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { LogoMark } from './Logo'
import './Contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState({})

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Tell us your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Enter a valid email'
    if (!form.message.trim()) er.message = 'A short brief helps us reply faster'
    return er
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    if (Object.keys(er).length) {
      setErrors(er)
      return
    }
    // demo only — wire to your endpoint / CRM here
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <Reveal className="contact__left">
          <span className="eyebrow">Start a Project</span>
          <h2 className="display contact__title">
            Let's build something that
            <span className="gradient-text"> runs itself.</span>
          </h2>
          <p className="lead">
            Tell us what's slowing you down. We'll come back within one business day with
            a concrete way NLOGN can automate or build it.
          </p>

          <ul className="contact__points">
            <li>Free 30-minute scoping call</li>
            <li>Fixed-scope pilot in 2–4 weeks</li>
            <li>Senior engineers, no hand-offs</li>
          </ul>

          <div className="contact__direct">
            <a href="mailto:hello@nlogn.dev">hello@nlogn.dev</a>
            <span>·</span>
            <a href="tel:+10000000000">+1 (000) 000-0000</a>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="contact__form-wrap">
          <div className="card contact__card">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="contact__success-mark">
                    <LogoMark />
                  </div>
                  <h3>Message received.</h3>
                  <p>
                    Thanks, {form.name.split(' ')[0] || 'there'}. We'll be in touch within
                    one business day.
                  </p>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', email: '', service: '', message: '' })
                    }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact__form"
                  onSubmit={submit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Field
                    label="Name"
                    id="name"
                    value={form.name}
                    onChange={update('name')}
                    error={errors.name}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                  />
                  <Field
                    label="Work email"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    error={errors.email}
                    placeholder="ada@company.com"
                    autoComplete="email"
                  />
                  <div className="field">
                    <label htmlFor="service">What do you need?</label>
                    <select id="service" value={form.service} onChange={update('service')}>
                      <option value="">Select a focus…</option>
                      <option>AI Automation</option>
                      <option>Software Development</option>
                      <option>Workflow Orchestration</option>
                      <option>Data &amp; Analytics</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <Field
                    label="Project brief"
                    id="message"
                    as="textarea"
                    value={form.message}
                    onChange={update('message')}
                    error={errors.message}
                    placeholder="We want to automate…"
                  />
                  <button type="submit" className="btn btn-primary contact__submit">
                    Send Message
                  </button>
                  <p className="contact__fineprint">
                    By sending, you agree to be contacted about your enquiry.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, id, as = 'input', error, ...rest }) {
  const Tag = as
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <Tag id={id} aria-invalid={!!error} {...rest} />
      {error && (
        <span className="field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
