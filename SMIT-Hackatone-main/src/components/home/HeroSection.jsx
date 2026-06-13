import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

function HeroSection() {
  const navigate = useNavigate()
  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '100px 0 80px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'inline-flex', gap: 10, marginBottom: 24, alignItems: 'center' }}
          >
            <span style={{ display: 'inline-flex', width: 12, height: 12, borderRadius: '999px', background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }} />
            <span style={{ color: '#7c9dd5', fontWeight: 600 }}>Premium AI CV Matching</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="section-heading"
            style={{ fontSize: 'clamp(3rem, 5vw, 4.8rem)', lineHeight: 1.02, margin: 0, maxWidth: 700 }}
          >
            Turn your CV into a career-winning job match engine.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="muted"
            style={{ margin: '28px 0 30px', maxWidth: 620, fontSize: '1.05rem', lineHeight: 1.85 }}
          >
            Upload your resume and let JobScout AI extract your strengths, analyze your career story, and surface the most relevant roles with confidence scores.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <button type="button" className="button-primary" onClick={() => navigate('/dashboard')}>
              <Sparkles size={18} /> Start Matching
            </button>
            <button type="button" className="button-secondary" onClick={() => navigate('/dashboard')}>
              Explore Dashboard
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="card"
          style={{ padding: 28, minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 22 }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#00d4ff' }} />
              <span style={{ color: '#7c9dd5', fontWeight: 600 }}>AI profile builder</span>
            </div>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.3rem, 2vw, 1.75rem)', fontFamily: 'var(--font-display)' }}>One upload. Instant career insight.</h2>
            <p className="muted" style={{ marginTop: 14, lineHeight: 1.8 }}>
              Get a polished profile summary, skill match score, and job reasoning all in one intelligent workspace.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 16, marginTop: 28 }}>
            {[
              { label: 'CV parsing', value: 'PDF / DOCX', accent: '#00D4FF' },
              { label: 'Match confidence', value: 'AI ranked', accent: '#7c3aed' },
              { label: 'Actionable insights', value: 'Role fit + reasoning', accent: '#22c55e' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 20 }}>
                <span className="muted">{item.label}</span>
                <span style={{ fontWeight: 700, color: item.accent }}>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

