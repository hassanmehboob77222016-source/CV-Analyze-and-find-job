import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import BackgroundGrid from '../components/ui/BackgroundGrid'
import CVUploader from '../components/upload/CVUploader'
import CVPreview from '../components/upload/CVPreview'
import LoadingAgent from '../components/ui/LoadingAgent'
import CVProfileCard from '../components/profile/CVProfileCard'
import FilterBar from '../components/jobs/FilterBar'
import JobList from '../components/jobs/JobList'
import { checkHealth, searchJobs, uploadCV } from '../api/client.js'

function statLabel(value, label, description) {
  return (
    <div style={{ padding: 22, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7c9dd5' }}>{label}</p>
      <p style={{ margin: '12px 0 0', fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{value}</p>
      <p className="muted" style={{ marginTop: 10, lineHeight: 1.75 }}>{description}</p>
    </div>
  )
}

function DashboardPage({ appState, setAppState }) {
  const [cvText, setCvText] = useState((appState.cvText || appState.cvPreview || '').trim())
  const [phase, setPhase] = useState(appState.jobs.length > 0 ? 'results' : 'upload')
  const [error, setError] = useState('')
  const [backendOnline, setBackendOnline] = useState(true)
  const [missingApiKeys, setMissingApiKeys] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const [minScore, setMinScore] = useState(30)

  const filteredJobs = useMemo(() => {
    const result = [...appState.jobs].filter((job) => (job.match_score ?? 0) >= minScore)
    result.sort((a, b) =>
      sortOrder === 'desc' ? (b.match_score ?? 0) - (a.match_score ?? 0) : (a.match_score ?? 0) - (b.match_score ?? 0)
    )
    return result
  }, [appState.jobs, minScore, sortOrder])
  const hasResults = appState.jobs.length > 0

  useEffect(() => {
    const ping = async () => {
      const result = await checkHealth()
      setBackendOnline(result.success)
      if (result.success && result.data?.api_keys_configured === false) {
        setMissingApiKeys(result.data.missing_keys || [])
      } else {
        setMissingApiKeys([])
      }
    }
    ping()
  }, [])

  const handleFileUpload = async (file) => {
    setError('')
    setPhase('uploading')

    const uploadResult = await uploadCV(file)

    if (!uploadResult.success) {
      const uploadError = uploadResult.error || 'Upload failed'
      toast.error(uploadError)
      setError(uploadError)
      setPhase('upload')
      return false
    }

    const cvTextFromUpload = (uploadResult.data.cv_text || uploadResult.data.cv_text_preview || '').trim()
    if (!cvTextFromUpload) {
      const emptyTextError = 'Could not extract readable text from this CV. Please try another PDF/DOCX file.'
      toast.error(emptyTextError)
      setError(emptyTextError)
      setPhase('upload')
      return false
    }

    setCvText(cvTextFromUpload)
    setAppState((prev) => ({
      ...prev,
      fileName: uploadResult.data.file_name || file.name,
      cvText: cvTextFromUpload,
      cvPreview: uploadResult.data.cv_text_preview || '',
      jobs: [],
      cvProfile: null,
      searchQueries: [],
      totalFound: 0,
    }))

    setPhase('loading')
    const searchResult = await searchJobs(cvTextFromUpload)

    if (!searchResult.success) {
      const searchError = searchResult.error || 'Search failed'
      toast.error(searchError)
      setError(searchError)
      setPhase('upload')
      return false
    }

    setAppState((prev) => ({
      ...prev,
      cvProfile: searchResult.data.cv_profile || null,
      jobs: searchResult.data.jobs || [],
      searchQueries: searchResult.data.search_queries_used || [],
      totalFound: searchResult.data.total_found || 0,
    }))
    setPhase('results')
    return true
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundGrid />
      <Navbar />
      <main className="container" style={{ position: 'relative', zIndex: 1, padding: '32px 0 56px' }}>
        <section className="glass-panel" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ maxWidth: 680 }}>
              <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#7c9dd5', fontSize: 12 }}>
                Career operations center
              </p>
              <h1 style={{ margin: '14px 0 12px', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 3.5vw, 3.6rem)', lineHeight: 1.05 }}>
                Discover your best roles with resume intelligence and match clarity.
              </h1>
              <p className="muted" style={{ margin: 0, maxWidth: 680, lineHeight: 1.9 }}>
                Upload your CV and let JobScout AI build your profile, rank opportunities, and surface what matters most for your next career step.
              </p>
            </div>
            <div style={{ display: 'grid', gap: 14, minWidth: 240, width: '100%', maxWidth: 380 }}>
              {statLabel(appState.totalFound || 0, 'Total matches', 'Number of opportunities found for your current CV')}
              {statLabel(appState.cvProfile?.years_experience ?? 0, 'Years experience', 'Experience extracted from your resume')}
            </div>
          </div>
        </section>

        {!backendOnline && (
          <div className="glass-panel" style={{ border: '1px solid rgba(239,68,68,0.18)', padding: 18, marginBottom: 18 }}>
            <strong>Backend is offline. Start the Python server.</strong>
            <p className="muted" style={{ marginTop: 6 }}>
              Run backend at <code>http://localhost:8000</code>, then refresh this page.
            </p>
          </div>
        )}

        {backendOnline && missingApiKeys.length > 0 && (
          <div className="glass-panel" style={{ border: '1px solid rgba(245,158,11,0.18)', padding: 18, marginBottom: 18 }}>
            <strong>API keys missing on the backend.</strong>
            <p className="muted" style={{ marginTop: 6 }}>
              Copy <code>env/.env.example</code> to <code>env/.env</code> and set: {missingApiKeys.join(', ')}.
            </p>
          </div>
        )}

        {error && (
          <div className="glass-panel" style={{ border: '1px solid rgba(239,68,68,0.18)', padding: 18, marginBottom: 18 }}>
            <strong>Agent failed:</strong> {error}
          </div>
        )}

        {phase !== 'loading' && !hasResults && (
          <section style={{ display: 'grid', gap: 24 }}>
            <div className="glass-panel" style={{ padding: 28, display: 'grid', gap: 24, gridTemplateColumns: '1fr 0.95fr', alignItems: 'start' }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Upload your CV and unlock matches</h2>
                <p className="muted" style={{ marginTop: 12, lineHeight: 1.8 }}>
                  Drop your resume and let the platform parse your profile, then generate ranked job opportunities with clear fit reasoning.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ display: 'inline-flex', padding: '10px 16px', borderRadius: 18, background: 'rgba(0,212,255,0.08)', color: '#00d4ff', fontWeight: 700 }}>
                  Ready to upload
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1.35fr 0.9fr' }}>
              <div className="glass-panel" style={{ padding: 28 }}>
                <CVUploader onFileSelected={handleFileUpload} isUploading={phase === 'uploading'} />
              </div>
              {appState.cvPreview && (
                <div className="glass-panel" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 280 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>Recent CV preview</h3>
                  <CVPreview previewText={appState.cvPreview} fileName={appState.fileName} />
                </div>
              )}
            </div>
          </section>
        )}

        {phase === 'loading' && (
          <div className="glass-panel" style={{ padding: 28, textAlign: 'center' }}>
            <LoadingAgent />
          </div>
        )}

        {phase === 'results' && hasResults && (
          <section style={{ display: 'grid', gap: 24 }}>
            <div className="glass-panel" style={{ padding: 26, display: 'grid', gap: 18, gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#7c9dd5', fontSize: 12 }}>Match analytics</p>
                <h2 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: '2rem' }}>Your latest AI match report</h2>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 18, background: 'rgba(0,212,255,0.08)', color: '#00d4ff', fontWeight: 700 }}>
                {filteredJobs.length} matched roles
              </div>
            </div>

            <div style={{ display: 'grid', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
                {statLabel(filteredJobs.length, 'Active matches', 'Roles above your selected score threshold')}
                {statLabel(appState.cvProfile?.skills?.length ?? 0, 'Detected skills', 'Skills extracted from your CV')}
                {statLabel(appState.searchQueries?.length ?? 0, 'Search prompts', 'AI queries used to analyze your CV')}
              </div>
            </div>

            <CVProfileCard profile={appState.cvProfile} queries={appState.searchQueries} />
            <FilterBar
              sortOrder={sortOrder}
              minScore={minScore}
              onSortChange={setSortOrder}
              onMinScoreChange={setMinScore}
              total={filteredJobs.length}
              onReset={() => {
                setSortOrder('desc')
                setMinScore(30)
              }}
            />
            <JobList jobs={filteredJobs} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default DashboardPage

