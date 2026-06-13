import { FileText } from 'lucide-react'

function CVPreview({ previewText, fileName }) {
  return (
    <div className="card" style={{ marginTop: 16, padding: 18, textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <FileText size={18} color="#00D4FF" />
        <strong>{fileName}</strong>
      </div>
      <p className="muted" style={{ marginBottom: 8 }}>
        Parsed Preview
      </p>
      <p style={{ lineHeight: 1.6 }}>{previewText || 'Preview unavailable.'}</p>
    </div>
  )
}

export default CVPreview

