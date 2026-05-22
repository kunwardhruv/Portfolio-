'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = words[idx]
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1))
        if (text.length + 1 === cur.length) setTimeout(() => setDel(true), pause)
      } else {
        setText(cur.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setIdx(i => (i + 1) % words.length) }
      }
    }, del ? 40 : speed)
    return () => clearTimeout(t)
  }, [text, del, idx, words, speed, pause])
  return text
}

function Btn({ href, variant, children, external, isLink }) {
  const base = {
    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em',
    padding: '0.85rem 1.75rem', borderRadius: '4px', textDecoration: 'none',
    display: 'inline-block', background: 'transparent', transition: 'all 0.2s',
  }
  const styles = {
    outline: { ...base, border: '1.5px solid #f59e0b', color: '#f59e0b' },
    plain:   { ...base, border: '1.5px solid rgba(255,255,255,0.25)', color: '#ffffff' },
  }

  if (isLink) {
    return (
      <Link href={href} style={styles[variant]}
        onMouseEnter={e => { e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='#f59e0b' }}
        onMouseLeave={e => { e.currentTarget.style.color = variant==='outline' ? '#f59e0b' : '#ffffff'; e.currentTarget.style.borderColor = variant==='outline' ? '#f59e0b' : 'rgba(255,255,255,0.25)' }}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
      style={styles[variant]}
      onMouseEnter={e => { e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='#f59e0b' }}
      onMouseLeave={e => { e.currentTarget.style.color = variant==='outline' ? '#f59e0b' : '#ffffff'; e.currentTarget.style.borderColor = variant==='outline' ? '#f59e0b' : 'rgba(255,255,255,0.25)' }}>
      {children}
    </a>
  )
}

export default function Hero() {
  const nameRef = useRef(null)
  const typed = useTypewriter(['AI/ML Engineer', 'AI Developer', 'Agentic AI Builder', 'RAG Specialist'])

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap')
      const el = nameRef.current
      if (!el) return
      el.querySelectorAll('.gw').forEach(word => {
        word.innerHTML = word.textContent.split('').map(l =>
          `<span style="display:inline-block;overflow:hidden"><span style="display:inline-block">${l === ' ' ? '&nbsp;' : l}</span></span>`
        ).join('')
      })
      gsap.from(el.querySelectorAll('span > span'), {
        y: '110%', opacity: 0, duration: 0.9, stagger: 0.035, ease: 'power4.out', delay: 0.2
      })
    }
    run()
  }, [])

  return (
    <section id="hero" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 5% 4rem', position: 'relative', overflow: 'hidden' }}>

      {/* Orange line */}
      <motion.div initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.6, delay: 0.3 }}
        style={{ height: 3, backgroundColor: '#f59e0b', marginBottom: '2rem', borderRadius: 2 }} />

      {/* Role label */}
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="label">
        AI/ML Engineer &amp; AI Developer
      </motion.p>

      {/* Name — "Dhruv. Singh" — Singh in ORANGE */}
      <div ref={nameRef} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(4rem, 10vw, 8.5rem)', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '1.75rem' }}>
        <span className="gw" style={{ color: '#ffffff' }}>Dhruv</span>
        <span style={{ color: '#f59e0b' }}>.</span>{' '}
        <span className="gw" style={{ color: '#f59e0b' }}>Singh</span>
      </div>

      {/* Typewriter */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', color: '#f59e0b', marginBottom: '1.5rem', minHeight: '1.5rem', letterSpacing: '0.05em' }}>
        {typed}<span style={{ animation: 'blink 1s step-end infinite', marginLeft: 2 }}>|</span>
      </motion.div>

      {/* Description — ALL WHITE */}
      <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
        style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)', color: '#ffffff', maxWidth: 500, lineHeight: 1.8, marginBottom: '2.75rem' }}>
        Building the future with artificial intelligence. Specialized in creating intelligent systems that solve real-world problems through machine learning and agentic AI.
      </motion.p>

      {/* Buttons */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Btn href="/projects" variant="outline" isLink>VIEW WORK</Btn>
        <Btn href="/contact" variant="plain" isLink>CONTACT</Btn>
        <Btn href="https://github.com/kunwardhruv" variant="plain" external>RESUME ↗</Btn>
      </motion.div>

      {/* DS Watermark */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}
        style={{ position: 'absolute', bottom: '0%', right: '-1%', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(12rem, 28vw, 26rem)', color: 'rgba(255,255,255,0.028)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>
        DS
      </motion.div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </section>
  )
}
