'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'fixed', inset: 0, backgroundColor: '#0a0a0a', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '5rem', color: '#f59e0b', letterSpacing: '-0.04em', lineHeight: 1 }}>
            DS
          </motion.div>
          <div style={{ width: 80, height: 1, backgroundColor: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{ height: '100%', backgroundColor: '#f59e0b', borderRadius: 2 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
