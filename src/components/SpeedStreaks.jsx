import { useEffect, useRef } from 'react'

/*
  Canvas of motion-blur light streaks — evokes the night-race / light-trail
  imagery from the brand board. Pure transform/alpha work on an offscreen
  loop; respects prefers-reduced-motion (renders a single static frame).
*/
export default function SpeedStreaks() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w, h, dpr
    let streaks = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const palette = [
      'rgba(31,111,255,', // brand blue
      'rgba(122,176,255,', // soft blue
      'rgba(255,255,255,', // white headlight
      'rgba(77,148,255,', // bright blue
    ]

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function makeStreak(initial) {
      // streaks converge toward a vanishing point on the right-center,
      // sweeping leftwards like a long-exposure of passing lights
      const vpY = h * 0.42
      const lane = (Math.random() - 0.5) * h * 0.9
      const y = vpY + lane
      const len = 120 + Math.random() * 520
      const speed = 4 + Math.random() * 13
      const color = palette[(Math.random() * palette.length) | 0]
      return {
        x: initial ? Math.random() * w : w + len + Math.random() * 300,
        y,
        len,
        speed,
        color,
        thickness: 0.6 + Math.random() * 2.4,
        alpha: 0.18 + Math.random() * 0.5,
      }
    }

    function seed() {
      const count = Math.round(Math.min(90, (w * h) / 16000))
      streaks = Array.from({ length: count }, () => makeStreak(true))
    }

    function drawStreak(s) {
      const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y)
      grad.addColorStop(0, s.color + '0)')
      grad.addColorStop(0.5, s.color + s.alpha + ')')
      grad.addColorStop(1, s.color + '0)')
      ctx.strokeStyle = grad
      ctx.lineWidth = s.thickness
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x + s.len, s.y)
      ctx.stroke()
    }

    function frame() {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const s of streaks) {
        drawStreak(s)
        s.x -= s.speed
        if (s.x + s.len < -50) Object.assign(s, makeStreak(false))
      }
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      // single static frame
      ctx.globalCompositeOperation = 'lighter'
      streaks.forEach(drawStreak)
      ctx.globalCompositeOperation = 'source-over'
    } else {
      frame()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="speed-streaks" aria-hidden="true" />
}
