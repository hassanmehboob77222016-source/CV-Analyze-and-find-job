import { useEffect, useState } from 'react'
import { Activity } from 'lucide-react'
import { checkHealth } from '../../api/client.js'

function StatusBadge() {
  const [online, setOnline] = useState(false)
  const [label, setLabel] = useState('Checking...')

  useEffect(() => {
    let mounted = true
    const ping = async () => {
      const result = await checkHealth()
      if (!mounted) return
      setOnline(result.success)
      setLabel(result.success ? 'Backend Online' : 'Backend Offline')
    }
    ping()
    const timer = setInterval(ping, 15000)
    return () => {
      mounted = false
      clearInterval(timer)
    }
  }, [])

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: `1px solid ${online ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
        padding: '8px 12px',
        borderRadius: 999,
        background: 'rgba(9, 18, 34, 0.75)',
        color: '#dbeafe',
        fontSize: 13,
      }}
    >
      <Activity size={14} color={online ? '#10B981' : '#EF4444'} />
      <span>{label}</span>
    </div>
  )
}

export default StatusBadge

