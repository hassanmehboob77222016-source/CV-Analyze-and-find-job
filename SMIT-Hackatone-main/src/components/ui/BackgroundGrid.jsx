import { motion } from 'framer-motion'

const dots = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 29) % 100}%`,
  duration: 8 + (i % 6),
}))

function BackgroundGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <motion.div
        animate={{ backgroundPosition: ['0px 0px', '0px 80px'] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.2,
          backgroundImage:
            'linear-gradient(to right, rgba(124,58,237,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.16) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          animate={{ y: [-5, 5, -5], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: dot.duration, repeat: Infinity }}
          style={{
            position: 'absolute',
            left: dot.left,
            top: dot.top,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#00D4FF',
            boxShadow: '0 0 12px #00D4FF',
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundGrid

