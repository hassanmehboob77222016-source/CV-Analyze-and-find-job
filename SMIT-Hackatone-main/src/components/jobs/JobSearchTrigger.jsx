import { motion } from 'framer-motion'
import { SearchCheck } from 'lucide-react'

function JobSearchTrigger({ disabled, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, boxShadow: disabled ? 'none' : '0 0 36px rgba(124,58,237,.4)' }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      type="button"
      style={{
        marginTop: 18,
        borderRadius: 14,
        border: '1px solid #7C3AED',
        background: disabled ? '#3d3358' : 'linear-gradient(90deg, #7C3AED, #00D4FF)',
        color: disabled ? '#C8BCE8' : '#04101f',
        fontWeight: 700,
        fontSize: 17,
        padding: '14px 24px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <SearchCheck size={18} /> Analyze My CV
    </motion.button>
  )
}

export default JobSearchTrigger

