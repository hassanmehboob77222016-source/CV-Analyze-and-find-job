import { motion } from 'framer-motion'
import { Brain, Target, UploadCloud } from 'lucide-react'

const items = [
  {
    title: 'Upload once',
    icon: UploadCloud,
    text: 'Import your resume in PDF or DOCX and let JobScout turn it into career intelligence.',
  },
  {
    title: 'AI profile mapping',
    icon: Brain,
    text: 'Extract job titles, skills, experience, and persona cues with precision.',
  },
  {
    title: 'Match with confidence',
    icon: Target,
    text: 'Receive ranked roles with fit scores and clear rationale for every recommendation.',
  },
]

function HowItWorks() {
  return (
    <section className="container" style={{ padding: '60px 0 100px', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0, color: '#7c9dd5', fontSize: 12 }}>
            How it works
          </p>
          <h2 className="section-heading" style={{ margin: '12px 0 0', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
            Build a smarter job search workflow with AI.
          </h2>
        </div>
        <p className="muted" style={{ maxWidth: 520, margin: 0 }}>
          From upload to matched roles, JobScout AI gives you the structured career signals recruiters want and the insights you need to act.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginTop: 30,
        }}
      >
        {items.map((item) => (
          <motion.article
            key={item.title}
            variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
            className="card"
            style={{ padding: 28, minHeight: 220, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'rgba(0, 212, 255, 0.12)' }}>
              <item.icon size={22} color="#00d4ff" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{item.title}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.8 }}>{item.text}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default HowItWorks

