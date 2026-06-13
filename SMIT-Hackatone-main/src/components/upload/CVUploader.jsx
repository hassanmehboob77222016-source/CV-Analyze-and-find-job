import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AlertCircle, CheckCircle2, Loader2, UploadCloud } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { loadSampleCV } from '../../api/client.js'

const MAX_SIZE = 10 * 1024 * 1024

function CVUploader({ onFileSelected, isUploading = false }) {
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const errCode = rejectedFiles[0]?.errors?.[0]?.code
      if (errCode === 'file-too-large') {
        toast.error('File must be under 10MB')
      } else {
        toast.error('Only PDF and DOCX files supported')
      }
      setState('error')
      setMessage(errCode === 'file-too-large' ? 'File is larger than 10MB.' : 'Invalid file type.')
      return
    }
    const file = acceptedFiles[0]
    if (!file) return

    if (isUploading) return

    setUploadedFileName(file.name)
    setState('uploading')
    setMessage('Uploading and analyzing your CV...')

    const processed = await onFileSelected(file)
    if (processed) {
      setState('success')
      setMessage('CV processed successfully')
    } else {
      setState('error')
      setMessage('Failed to process CV')
    }
  }

  const handleSampleCV = async () => {
    if (isUploading) return

    setUploadedFileName('sample_cv.pdf')
    setState('uploading')
    setMessage('Loading sample CV...')

    const sampleResult = await loadSampleCV()
    if (!sampleResult.success || !sampleResult.data) {
      setState('error')
      setMessage('Failed to load sample CV')
      toast.error(sampleResult.error || 'Failed to load sample')
      return
    }

    const processed = await onFileSelected({
      __samplePayload: sampleResult.data,
      name: sampleResult.data.file_name || 'sample_cv.pdf',
    })

    if (processed) {
      setState('success')
      setMessage('Sample CV processed successfully')
    } else {
      setState('error')
      setMessage('Failed to process sample CV')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  })

  const icon =
    state === 'uploading' || isUploading ? (
      <Loader2 className="spin" size={28} />
    ) : state === 'success' ? (
      <CheckCircle2 color="#10B981" size={28} />
    ) : state === 'error' ? (
      <AlertCircle color="#EF4444" size={28} />
    ) : (
      <UploadCloud color="#00D4FF" size={28} />
    )

  return (
    <div className="glass-panel" style={{ padding: 28, borderRadius: 28, overflow: 'hidden' }}>
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        animate={
          isDragActive
            ? { boxShadow: '0 0 32px rgba(0,212,255,0.22)', borderColor: 'rgba(0,212,255,0.45)' }
            : { boxShadow: 'none', borderColor: 'rgba(255,255,255,0.12)' }
        }
        style={{
          border: '1.5px dashed rgba(255,255,255,0.12)',
          borderRadius: 24,
          background: isDragActive ? 'rgba(0, 212, 255, 0.08)' : 'rgba(255,255,255,0.03)',
          padding: '44px 22px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <div style={{ display: 'grid', placeItems: 'center', gap: 16 }}>
          {icon}
          <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>Drop your CV here</h3>
          <p className="muted" style={{ maxWidth: 500, margin: '0 auto', lineHeight: 1.8 }}>
            {state === 'uploading' || isUploading
              ? 'Uploading and parsing your CV...'
              : state === 'success'
              ? `${uploadedFileName} successfully processed`
              : state === 'error'
              ? message
              : 'Drag and drop a PDF or DOCX file, or click to select one from your device.'}
          </p>
        </div>
      </motion.div>

      <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div style={{ color: '#8ca7d2', fontSize: 14 }}>
          Accepted files: PDF, DOCX • Max size: 10MB
        </div>
        <button
          type="button"
          onClick={handleSampleCV}
          disabled={isUploading}
          className="button-secondary"
          style={{ opacity: isUploading ? 0.6 : 1, minWidth: 175 }}
        >
          Try sample CV
        </button>
      </div>
      <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg);} }`}</style>
    </div>
  )
}

export default CVUploader

