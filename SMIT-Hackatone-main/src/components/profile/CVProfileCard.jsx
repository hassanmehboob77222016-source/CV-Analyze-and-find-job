function CVProfileCard({ profile, queries }) {
  return (
    <section className="glass-panel" style={{ padding: 28, marginBottom: 22 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0, maxWidth: 620 }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>CV Profile Snapshot</h2>
          <p className="muted" style={{ marginTop: 14, lineHeight: 1.8 }}>
            {profile?.summary || 'Your written profile will appear here once a CV is processed. This summary highlights your top skills, experience, and match potential.'}
          </p>
        </div>
        <div style={{ display: 'grid', gap: 10, minWidth: 220 }}> 
          <div style={{ padding: '18px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: 18 }}>
            <div style={{ color: '#7c9dd5', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Experience</div>
            <div style={{ marginTop: 8, fontSize: '1.5rem', fontWeight: 700 }}>{profile?.years_experience ?? 0}y</div>
          </div>
          <div style={{ padding: '18px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: 18 }}>
            <div style={{ color: '#7c9dd5', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Location</div>
            <div style={{ marginTop: 8, fontSize: '1.1rem', fontWeight: 700 }}>{profile?.location || 'Remote / Hybrid'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginTop: 28 }}>
        <div>
          <div style={{ color: '#7c9dd5', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Job Titles</div>
          <p style={{ marginTop: 10, lineHeight: 1.75 }}>{(profile?.job_titles || []).join(', ') || 'Not detected yet'}</p>
        </div>
        <div>
          <div style={{ color: '#7c9dd5', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Education</div>
          <p style={{ marginTop: 10, lineHeight: 1.75 }}>{(profile?.education || []).join(', ') || 'Not detected yet'}</p>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {(profile?.skills || []).map((skill) => (
            <span key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, borderRadius: 999, padding: '8px 14px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 26 }}>
        <div style={{ color: '#7c9dd5', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>Search queries used</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {(queries || []).map((q) => (
            <span key={q} style={{ fontFamily: 'var(--font-mono)', background: 'rgba(124,58,237,0.15)', borderRadius: 999, padding: '8px 14px', color: '#dbeafe' }}>
              {q}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CVProfileCard

