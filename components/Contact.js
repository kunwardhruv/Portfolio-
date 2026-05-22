'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CopyEmail from '@/components/CopyEmail'

const socials = [
  { label: 'GitHub', href: 'https://github.com/kunwardhruv', tag: 'kunwardhruv' },
  { label: 'X (Twitter)', href: 'https://x.com/tomardhruvsingh', tag: 'tomardhruvsingh' },
  { label: 'Instagram', href: 'https://www.instagram.com/kunwar.dhruvv/', tag: 'kunwar.dhruvv' },
  { label: 'Email', href: 'mailto:kunwarrdhruv@gmail.com', tag: 'kunwarrdhruv@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhruv-singh-24nov2004', tag: 'dhruv-singh-24nov2004' },
]

const deployedLinks = [
  { label: 'Medical AI Assistant', href: 'https://github.com/kunwardhruv/medical-ai-assistant' },
  { label: 'Legal Contract Analyzer', href: 'https://legal-contract-analyzer.streamlit.app' },
  { label: 'JSO Trust Agent', href: 'https://jso-trust-agent.vercel.app' },
]

// Updated with copy button
export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: '7rem 5% 5rem', borderTop: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle bg glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '4rem' }}
      >
        <span className="label">Contact</span>
        <h2
          className="heading"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', maxWidth: 700, lineHeight: 1 }}
        >
          Let's build something{' '}
          <span style={{ color: '#f59e0b' }}>intelligent</span>
          <span className="dot">.</span>
        </h2>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '4rem',
        }}
      >
        {/* Left: CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <p style={{ color: '#ffffff', fontWeight: 300, lineHeight: 1.8, fontSize: '0.92rem', maxWidth: 380 }}>
            I'm actively looking for AI/ML roles — internships and full-time. 
            Immediate joiner, open to relocation anywhere in India. 
            Got an interesting problem? Let's talk.
          </p>
          <CopyEmail />
        </motion.div>

        {/* Right: Links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Socials */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#444', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Find Me Online
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #1a1a1a',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f59e0b'
                    e.currentTarget.style.paddingLeft = '6px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#666'
                    e.currentTarget.style.paddingLeft = '0'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', letterSpacing: '0.05em' }}>{s.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'inherit' }}>{s.tag} →</span>
                </a>
              ))}
            </div>
          </div>

          {/* Deployed projects */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#444', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Live Projects
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {deployedLinks.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #1a1a1a',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f59e0b'
                    e.currentTarget.style.paddingLeft = '6px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#666'
                    e.currentTarget.style.paddingLeft = '0'
                  }}
                >
                  <span>{d.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          marginTop: '5rem',
          paddingTop: '2rem',
          borderTop: '1px solid #1a1a1a',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#333', letterSpacing: '0.05em' }}>
          © 2026 Dhruv Kunwar
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#333', letterSpacing: '0.05em' }}>
          B.Tech CSE · GGSIPU Delhi · Immediate Joiner
        </span>
      </motion.div>
    </section>
  )
}
