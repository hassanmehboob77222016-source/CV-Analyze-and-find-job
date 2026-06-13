import JobCard from './JobCard'

function JobList({ jobs }) {
  if (!jobs.length) {
    return (
      <div className="glass-panel" style={{ padding: 36, textAlign: 'center' }}>
        <h3 style={{ marginTop: 0, fontFamily: 'var(--font-display)', fontSize: '1.6rem' }}>No matches found yet</h3>
        <p className="muted" style={{ marginTop: 12, lineHeight: 1.8 }}>
          Upload a more detailed CV or lower the score threshold to reveal more opportunities.
        </p>
      </div>
    )
  }

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
      }}
    >
      {jobs.map((job, idx) => (
        <JobCard key={`${job.url}-${idx}`} job={job} index={idx} />
      ))}
    </section>
  )
}

export default JobList

