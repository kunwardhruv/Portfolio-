'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText('dshinepro3@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <a
        href="mailto:dshinepro3@gmail.com"
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.1em',
          color: '#000', textDecoration: 'none', backgroundColor: '#f59e0b',
          padding: '0.9rem 2rem', borderRadius: '4px', display: 'inline-block',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#d97706'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#f59e0b'; e.currentTarget.style.transform = 'none' }}
      >
        SEND EMAIL ↗
      </a>

      {/* Animated copy button */}
      <motion.button
        onClick={copy}
        whileTap={{ scale: 0.95 }}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em',
          color: copied ? '#22c55e' : '#666',
          background: 'transparent',
          border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : '#2a2a2a'}`,
          padding: '0.9rem 1.25rem', borderRadius: '4px',
          cursor: 'pointer', transition: 'all 0.2s',
          position: 'relative', overflow: 'hidden',
          minWidth: 130,
        }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="copied" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'block' }}>
              ✓ COPIED!
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'block' }}>
              COPY EMAIL
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
