'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const toggleTheme = () => {
    setDark(d => {
      const next = !d
      document.documentElement.classList.toggle('light', !next)
      return next
    })
  }

  const isActive = (href) => pathname === href

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 5%',
        backgroundColor: scrolled ? (dark ? 'rgba(10,10,10,0.92)' : 'rgba(245,245,240,0.92)') : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: '#f59e0b', textDecoration: 'none', letterSpacing: '-0.02em' }}>DS</Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="hidden md:flex">
        {links.map(link => (
          <li key={link.label}>
            <Link href={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: isActive(link.href) ? 600 : 400,
                fontSize: '0.92rem',
                color: isActive(link.href) ? '#f59e0b' : '#ffffff',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (!isActive(link.href)) e.currentTarget.style.color = '#f59e0b' }}
              onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.color = '#ffffff' }}>
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <button onClick={toggleTheme}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', transition: 'all 0.2s' }}>
            {dark ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>

      <a href="mailto:kunwarrdhruv@gmail.com" className="hidden md:inline-flex"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#f59e0b', textDecoration: 'none', border: '1px solid rgba(245,158,11,0.5)', padding: '0.5rem 1.2rem', borderRadius: '4px', letterSpacing: '0.06em', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f59e0b'; e.currentTarget.style.color = '#000' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#f59e0b' }}>
        HIRE ME
      </a>

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden"
        style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.5rem', padding: '0.25rem', cursor: 'pointer' }}>
        {menuOpen ? '✕' : '☰'}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: dark ? '#0d0d0d' : '#f0f0eb', borderBottom: '1px solid var(--border)', padding: '1.5rem 5%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {links.map(link => (
              <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ color: isActive(link.href) ? '#f59e0b' : '#ffffff', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500 }}>
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
