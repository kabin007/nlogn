import { LogoMark } from './Logo'
import './Footer.css'

const COLS = [
  {
    title: 'Services',
    links: ['AI Automation', 'Software Development', 'Workflow Orchestration', 'Data & Analytics'],
  },
  {
    title: 'Company',
    links: ['The Concept', 'Process', 'Work', 'Contact'],
  },
  {
    title: 'Connect',
    links: ['LinkedIn', 'GitHub', 'X / Twitter', 'hello@nlogn.dev'],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <LogoMark />
          <span className="footer__name">NLOGN</span>
          <p className="footer__tag">
            AI Automation · Software Development.
            <br />
            Two ends. Endless possibilities.
          </p>
        </div>

        <div className="footer__cols">
          {COLS.map((c) => (
            <div key={c.title} className="footer__col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} NLOGN. All rights reserved.</span>
        <span className="footer__signature">
          O(n&nbsp;log&nbsp;n) — efficiency by design.
        </span>
      </div>
    </footer>
  )
}
