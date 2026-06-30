import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ChatWidget.css'

const ease = [0.22, 1, 0.36, 1]

/* ---- Premade knowledge base: intent → reply + follow-up chips ---- */
const KB = [
  {
    id: 'services',
    match: ['service', 'do', 'offer', 'help', 'capab', 'build', 'develop'],
    reply:
      "We do two things exceptionally well: AI Automation (agents, copilots, RAG, workflow orchestration) and Software Development (web, mobile, APIs, cloud). Most projects blend both.",
    chips: ['How much does it cost?', 'How long does it take?', 'Start a project'],
  },
  {
    id: 'automation',
    match: ['automat', 'ai', 'agent', 'bot', 'workflow', 'llm', 'gpt'],
    reply:
      "Our AI automation builds custom agents that take over repetitive ops — support, data entry, reporting — running 24/7. Clients typically see 80%+ of routine tasks auto-resolved.",
    chips: ['What does it cost?', 'Show me your work', 'Book a call'],
  },
  {
    id: 'pricing',
    match: ['cost', 'price', 'pricing', 'budget', 'expensive', 'much', 'rate'],
    reply:
      "Pilots start small and fixed-scope, usually shipped in 2–4 weeks. Full builds are quoted after a free 30-minute scoping call so the number reflects real scope — no surprises.",
    chips: ['Book the free call', 'How long does it take?'],
  },
  {
    id: 'timeline',
    match: ['long', 'time', 'timeline', 'fast', 'when', 'deadline', 'week'],
    reply:
      "Fast. You'll see a working system in weeks, not quarters — a focused pilot lands in 2–4 weeks, then we iterate in tight sprints toward production.",
    chips: ['Start a project', 'What does it cost?'],
  },
  {
    id: 'work',
    match: ['work', 'portfolio', 'example', 'case', 'project', 'client', 'result'],
    reply:
      "A few live ones: an autonomous support desk (82% tickets auto-resolved), a logistics control tower (3.4× faster dispatch), and a demand-forecast engine (−37% inventory waste).",
    chips: ['How do you work?', 'Start a project'],
  },
  {
    id: 'process',
    match: ['process', 'how do you', 'approach', 'method', 'step', 'work with'],
    reply:
      "Four stages: Map → Architect → Build → Scale. We pinpoint the highest-leverage wins, design lean systems that scale n log n, ship fast, then tune in production.",
    chips: ['Start a project', 'Selected work'],
  },
  {
    id: 'contact',
    match: ['start', 'contact', 'call', 'email', 'talk', 'book', 'reach', 'hire', 'quote'],
    reply:
      "Let's talk. Scroll to the contact section to send a brief, or email hello@nlogn.dev — we reply within one business day with a concrete next step.",
    chips: ['Take me to contact', 'What do you offer?'],
    action: 'contact',
  },
  {
    id: 'greeting',
    match: ['hi', 'hello', 'hey', 'yo', 'sup', 'greet'],
    reply:
      "Hey! I'm Logan, the NLOGN assistant. I can tell you about our services, pricing, timelines, or get you started on a project. What's on your mind?",
    chips: ['What do you offer?', 'How much does it cost?', 'Start a project'],
  },
]

const FALLBACK = {
  reply:
    "Good question — I'll make sure the team covers that. The fastest path is a quick scoping call. Want me to point you to the contact form?",
  chips: ['Take me to contact', 'What do you offer?', 'How much does it cost?'],
  action: null,
}

const GREETING = {
  from: 'bot',
  text:
    "Hi 👋 I'm Logan, the NLOGN assistant. Ask me anything about AI automation or software — or pick a question below.",
  chips: ['What do you offer?', 'How much does it cost?', 'Start a project'],
}

function resolve(text) {
  const q = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const entry of KB) {
    const score = entry.match.reduce((s, m) => (q.includes(m) ? s + 1 : s), 0)
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }
  return bestScore > 0 ? best : FALLBACK
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [unread, setUnread] = useState(true)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([GREETING])
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const timers = useRef([])

  // autoscroll on new content
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  // focus input + clear unread on open; Escape to close
  useEffect(() => {
    if (open) {
      setUnread(false)
      const t = setTimeout(() => inputRef.current?.focus(), 320)
      const onKey = (e) => e.key === 'Escape' && setOpen(false)
      window.addEventListener('keydown', onKey)
      return () => {
        clearTimeout(t)
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const send = (raw) => {
    const text = (raw ?? input).trim()
    if (!text) return
    setInput('')
    setMessages((m) => [...m, { from: 'user', text }])
    setTyping(true)

    const res = resolve(text)
    const t = setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: res.reply, chips: res.chips }])
      if (res.action === 'contact') {
        const t2 = setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 600)
        timers.current.push(t2)
      }
    }, 850 + Math.min(text.length * 12, 700))
    timers.current.push(t)
  }

  return (
    <>
      {/* ---- Launcher (distinct, modern orb) ---- */}
      <motion.button
        className={`chat-fab ${open ? 'chat-fab--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
      >
        <span className="chat-fab__ring" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              width="24" height="24" viewBox="0 0 24 24" fill="none"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M6 6l12 12M18 6L6 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.span
              key="dots"
              className="chat-fab__icon"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <i /><i /><i />
            </motion.span>
          )}
        </AnimatePresence>
        {unread && !open && <span className="chat-fab__badge" aria-hidden="true">1</span>}
      </motion.button>

      {/* ---- Chat panel (matches site theme) ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chat-panel"
            role="dialog"
            aria-label="NLOGN chat assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease }}
          >
            <header className="chat-head">
              <div className="chat-head__avatar" aria-hidden="true">
                <i /><i /><i />
              </div>
              <div className="chat-head__meta">
                <strong>NLOGN Assistant</strong>
                <span><em className="chat-online" /> Online · replies instantly</span>
              </div>
              <button
                className="chat-head__close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="chat-body" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg chat-msg--${m.from}`}>
                  {m.from === 'bot' && (
                    <span className="chat-msg__avatar" aria-hidden="true">
                      <i /><i /><i />
                    </span>
                  )}
                  <div className="chat-msg__col">
                    <div className="chat-bubble">{m.text}</div>
                    {m.chips && (
                      <div className="chat-chips">
                        {m.chips.map((c) => (
                          <button key={c} onClick={() => send(c)} className="chat-chip">
                            {c}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    className="chat-msg chat-msg--bot"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="chat-msg__avatar" aria-hidden="true">
                      <i /><i /><i />
                    </span>
                    <div className="chat-bubble chat-bubble--typing" aria-label="Assistant is typing">
                      <span /><span /><span />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about automation, pricing…"
                aria-label="Type your message"
              />
              <button type="submit" aria-label="Send message" disabled={!input.trim()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
