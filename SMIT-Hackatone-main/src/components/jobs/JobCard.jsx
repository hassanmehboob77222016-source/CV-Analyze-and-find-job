import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, ExternalLink, MapPin } from 'lucide-react'
import MatchScoreBadge from './MatchScoreBadge'

function sourceFromUrl(url = '') {
  if (url.includes('linkedin')) return 'LinkedIn'
  if (url.includes('indeed')) return 'Indeed'
  if (url.includes('glassdoor')) return 'Glassdoor'
  return 'Job Board'
}

function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(false)
  const reasoning = job.reasoning || ''
  const preview = expanded ? reasoning : `${reasoning.slice(0, 140)}${reasoning.length > 140 ? '...' : ''}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0, 0, 0, 0.24)' }}
      className="glass-panel"
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 360 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>{job.job_title}</h3>
          <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 12, color: '#9bb4d8', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><Building2 size={16} /> {job.company}</span>
            <span style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '4px 12px', fontSize: 13 }}>{sourceFromUrl(job.url)}</span>
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, color: '#8ca7d2' }}>
            <MapPin size={14} /> {job.location || 'Remote'}
          </div>
        </div>
        <MatchScoreBadge score={job.match_score ?? 0} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {(job.key_matching_skills || []).map((skill) => (
          <span
            key={skill}
            style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.12)', fontSize: 13 }}
          >
            {skill}
          </span>
        ))}
      </div>

      <p style={{ margin: 0, lineHeight: 1.75, color: '#d1dbf4' }}>
        {preview}
      </p>
      {reasoning.length > 140 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{ alignSelf: 'flex-start', border: 'none', background: 'transparent', color: '#00d4ff', cursor: 'pointer', padding: 0, fontWeight: 600 }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      <a
        href={job.url}
        target="_blank"
        rel="noreferrer"
        style={{
          marginTop: 'auto',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          width: 'fit-content',
          border: '1px solid rgba(0,212,255,0.24)',
          background: 'rgba(0,212,255,0.08)',
          padding: '12px 16px',
          borderRadius: 16,
          color: '#00d4ff',
          transition: 'background 0.2s ease',
        }}
      >
        View Job <ExternalLink size={16} />
      </a>
    </motion.article>
  )
}

export default JobCard

