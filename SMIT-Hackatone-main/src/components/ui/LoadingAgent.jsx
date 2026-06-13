import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, CircleDot } from 'lucide-react'

const labels = ['Ingesting CV', 'Planning Queries', 'Searching Jobs', 'Evaluating Matches', 'Ranking Results']

function LoadingAgent() {
  const [step, setStep] = useState(0)
  const status = useMemo(
    () =>
      labels.map((label, idx) => ({
        label,
        state: idx < step ? 'done' : idx === step ? 'active' : 'pending',
      })),
    [step]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s < labels.length - 1 ? s + 1 : s))
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
        style={{
          position: 'absolute',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,.36), transparent 70%)',
          right: -80,
          top: -80,
        }}
      />
      <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)' }}>Your AI agent is working...</h2>
      <p className="muted">Parsing CV... Planning searches... Hunting jobs...</p>
      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        {status.map((item) => (
          <div key={item.label} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {item.state === 'done' ? (
              <CheckCircle2 color="#10B981" size={18} />
            ) : (
              <motion.span
                animate={item.state === 'active' ? { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] } : {}}
                transition={{ repeat: Infinity, duration: 1.3 }}
              >
                <CircleDot size={18} color={item.state === 'active' ? '#00D4FF' : '#4D648F'} />
              </motion.span>
            )}
            <span style={{ color: item.state === 'pending' ? '#7f8dad' : '#e1ecff' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LoadingAgent

