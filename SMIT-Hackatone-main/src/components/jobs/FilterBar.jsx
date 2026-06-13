import { motion } from 'framer-motion'

function FilterBar({ sortOrder, minScore, onSortChange, onMinScoreChange, total, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{ margin: '20px 0 26px', padding: 22, display: 'grid', gap: 18 }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color: '#fff' }}>Filter results</span>
          <span style={{ color: '#8ca7d2' }}>Showing {total} matching roles</span>
        </div>
        <button type="button" onClick={onReset} className="button-secondary" style={{ minWidth: 160 }}>
          Reset filters
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) minmax(220px, 1fr)', gap: 18 }}>
        <label style={{ display: 'grid', gap: 10 }}>
          <span className="muted">Sort by</span>
          <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
            <option value="desc">Match Score: Highest first</option>
            <option value="asc">Match Score: Lowest first</option>
          </select>
        </label>
        <label style={{ display: 'grid', gap: 10 }}>
          <span className="muted">Minimum score</span>
          <div style={{ display: 'grid', gap: 8 }}>
            <input type="range" min="0" max="100" value={minScore} onChange={(e) => onMinScoreChange(Number(e.target.value))} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9bb4d8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              <span>0</span>
              <span>{minScore}</span>
              <span>100</span>
            </div>
          </div>
        </label>
      </div>
    </motion.div>
  )
}

export default FilterBar

