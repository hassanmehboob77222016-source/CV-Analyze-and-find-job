import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import StatusBadge from '../ui/StatusBadge'

const linkStyle = ({ isActive }) => ({
  color: isActive ? '#ffffff' : '#9bb4d8',
  fontWeight: 600,
  transition: 'color 0.2s ease',
})

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(18px)',
        background: 'rgba(5, 10, 22, 0.88)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '18px 0' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#fff' }}>
          <span style={{ color: '#00d4ff' }}>●</span>
          <span>JobScout AI</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={{ display: 'none', background: 'transparent', border: 0, color: '#fff' }}
          className="nav-menu-btn"
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={`nav-links ${open ? 'nav-open' : ''}`}>
          <NavLink to="/" style={linkStyle} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/dashboard" style={linkStyle} onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
          <StatusBadge />
        </nav>
      </div>
      <style>{`
        .nav-links { display: flex; align-items: center; gap: 24px; }
        @media (max-width: 860px) {
          .nav-menu-btn { display: inline-flex !important; }
          .nav-links {
            position: absolute;
            top: 78px;
            right: 22px;
            flex-direction: column;
            align-items: stretch;
            width: min(300px, 88vw);
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(7, 13, 24, 0.96);
            border-radius: 22px;
            padding: 18px;
            opacity: 0;
            pointer-events: none;
            transform: translateY(-12px);
            transition: all .2s ease;
          }
          .nav-open { opacity: 1; pointer-events: auto; transform: translateY(0); }
          .nav-links a, .nav-links div { width: 100%; }
        }
      `}</style>
    </header>
  )
}

export default Navbar

