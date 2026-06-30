/* Lightweight line icons (Lucide-style, 1.6 stroke) — consistent family. */
const base = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const IconBot = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="8" width="16" height="11" rx="3" />
    <path d="M12 8V4M9 4h6" />
    <circle cx="9" cy="13" r="1" />
    <circle cx="15" cy="13" r="1" />
    <path d="M2 12v3M22 12v3" />
  </svg>
)

export const IconCode = (p) => (
  <svg {...base} {...p}>
    <path d="m8 9-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
  </svg>
)

export const IconWorkflow = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" />
    <path d="M9 6h4a2 2 0 0 1 2 2v7" />
  </svg>
)

export const IconChart = (p) => (
  <svg {...base} {...p}>
    <path d="M4 4v16h16" />
    <path d="m7 14 3-3 3 3 5-6" />
  </svg>
)

export const IconCloud = (p) => (
  <svg {...base} {...p}>
    <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.5 11 4 4 0 0 0 7 19h10.5Z" />
    <path d="M12 12v5M9.5 14.5 12 12l2.5 2.5" />
  </svg>
)

export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconSpark = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
  </svg>
)

export const IconLayers = (p) => (
  <svg {...base} {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 13 9 5 9-5M3 18l9 5 9-5" opacity="0.5" />
  </svg>
)
