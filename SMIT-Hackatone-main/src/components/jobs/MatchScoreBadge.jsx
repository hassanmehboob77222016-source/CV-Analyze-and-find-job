import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const radius = 34
const circumference = 2 * Math.PI * radius

function getColor(score) {
  if (score >= 75) return '#22c55e'
  if (score >= 50) return '#fbbf24'
  return '#fb7185'
}

function getLabel(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Strong'
  if (score >= 40) return 'Good'
  return 'Needs Work'
}

function MatchScoreBadge({ score }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let current = 0
    const step = Math.max(1, Math.ceil(score / 25))
    const timer = setInterval(() => {
      current += step
      if (current >= score) {
        current = score
        clearInterval(timer)
      }
      setDisplay(current)
    }, 18)
    return () => clearInterval(timer)
  }, [score])

  const offset = circumference - (score / 100) * circumference
  const color = getColor(score)

  return (
    <div style={{ width: 96, height: 96, position: 'relative', display: 'grid', placeItems: 'center' }}>
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 48 48)"
          initial={{ strokeDashoffset: circumference, strokeDasharray: circumference }}
          animate={{ strokeDashoffset: offset, strokeDasharray: circumference }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color }}>{display}</span>
        <small style={{ display: 'block', marginTop: 4, color: '#9bb4d8', fontSize: 11 }}>{getLabel(score)}</small>
      </div>
    </div>
  )
}

export default MatchScoreBadge

