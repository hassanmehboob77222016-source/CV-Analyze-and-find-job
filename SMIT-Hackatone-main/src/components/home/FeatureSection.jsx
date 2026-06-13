import { motion } from 'framer-motion'
import { Sparkles, ShieldCheck, Zap, BookOpen } from 'lucide-react'

const features = [
  {
    title: 'AI-powered profile synthesis',
    icon: ShieldCheck,
    description: 'Extract career highlights, role fit, and skills from any resume format in seconds.',
  },
  {
    title: 'Match score intelligence',
    icon: Zap,
    description: 'Rank roles with confidence scores and explain why each job is a great fit.',
  },
  {
    title: 'One dashboard workflow',
    icon: BookOpen,
    description: 'Manage uploads, review matches, and discover opportunities from a single workspace.',
  },
  {
    title: 'Optimized job insights',
    icon: Sparkles,
    description: 'Get career guidance, skill signals, and clearer next steps for stronger applications.',
  },
]

function FeatureSection() {
  return (
    <section className="container" style={{ padding: '60px 0 80px', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gap: 28 }}>
        <div style={{ maxWidth: 640 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.24em', margin: 0, color: '#7c9dd5', fontSize: 12 }}>
            Built for high-impact career moves
          </p>
          <h2 className="section-heading" style={{ margin: '16px 0 0', fontSize: 'clamp(2.4rem, 3.8vw, 3.6rem)' }}>
            Faster resume reviews, smarter matches, and more confident job decisions.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass-panel"
              style={{ padding: 24, minHeight: 220, display: 'flex', flexDirection: 'column', gap: 18 }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 18,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(0, 212, 255, 0.12)',
                }}
              >
                <feature.icon size={22} color="#00d4ff" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{feature.title}</h3>
                <p className="muted" style={{ margin: 0, lineHeight: 1.8 }}>{feature.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
