function Footer() {
  return (
    <footer style={{ marginTop: 80, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container" style={{ padding: '28px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, color: '#8ca7d2', fontSize: 14 }}>
        <div>
          <strong style={{ color: '#fff' }}>JobScout AI</strong>
          <p style={{ margin: '8px 0 0', maxWidth: 380 }}>A premium AI assistant built to transform CVs into matched career opportunities.</p>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <span>Built for your hackathon demo</span>
          <span>Powered by AI-driven CV parsing</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

