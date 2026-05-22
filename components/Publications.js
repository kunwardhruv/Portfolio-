'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const papers = [
  {
    num: '01',
    title: 'AI Resume Screener Using NLP and Transformers',
    journal: 'IRJMETS',
    issn: '2582-5208',
    impact: '8.187',
    vol: 'Vol. 7, Issue 11',
    date: 'November 2025',
    href: 'https://drive.google.com/file/d/1upLdoukacV5mx6y_4vYDZr6kcOOdZP6f/view?usp=drivesdk',   // TODO: replace with actual URL
    certHref: 'https://drive.google.com/file/d/1suqOaZV85suZ2uBZJSU-QB_IWjZEWGtq/view?usp=drivesdk', // TODO: replace with certificate URL
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #0d1117 100%)',
    preview: 'Semantic similarity-based resume ranking with weighted NLP scoring across keywords, experience, education, and certifications.',
    intro: [
      { label: 'What it is', value: 'An NLP-powered resume screening system that automatically ranks resumes against a job description using semantic similarity.' },
      { label: 'Problem solved', value: 'Manual resume screening is slow and biased. This automates ranking across multiple weighted factors.' },
      { label: 'How it works', value: 'Uses Sentence-Transformers (all-MiniLM-L6-v2) to create embeddings, then scores resumes on keyword coverage, experience, education level, and certifications.' },
      { label: 'Key result', value: 'Multi-factor weighted scoring with adjustable weights and an interactive Streamlit dashboard with CSV export.' },
      { label: 'Published in', value: 'IRJMETS — ISSN 2582-5208 — Impact Factor 8.187 — Vol. 7, Issue 11 — November 2025' },
      { label: 'Stack', value: 'Python, spaCy, Sentence-Transformers, scikit-learn, pandas, Streamlit' },
    ],
  },
  {
    num: '02',
    title: 'Big Data and Deep Learning in Sports Analytics: Performance Optimization',
    journal: 'IJSRED',
    issn: '2581-7175',
    impact: '5.658',
    vol: 'Vol. 7, Issue 6',
    date: 'Nov–Dec 2024',
    href: 'https://drive.google.com/file/d/1upLdoukacV5mx6y_4vYDZr6kcOOdZP6f/view?usp=drivesdk',   // TODO: replace with actual URL
    certHref: 'https://drive.google.com/file/d/1so-K-_8iyyEB2tALh9C5V35QmACvTplf/view?usp=drivesdk', // TODO: replace with certificate URL
    accent: '#22d3ee',
    gradient: 'linear-gradient(135deg, #001a1a 0%, #0d1117 100%)',
    preview: 'Deep learning models applied to sports performance data for player analytics and predictive performance optimization.',
    intro: [
      { label: 'What it is', value: 'A research study applying big data techniques and deep learning models to sports performance datasets for player analytics.' },
      { label: 'Problem solved', value: 'Traditional sports analytics rely on basic stats. This paper explores how DL models can predict and optimize athlete performance.' },
      { label: 'How it works', value: 'Combines big data pipelines with deep learning architectures (CNNs, LSTMs) trained on player performance metrics and match data.' },
      { label: 'Key result', value: 'Demonstrated measurable improvement in performance prediction accuracy using deep learning vs traditional statistical models.' },
      { label: 'Published in', value: 'IJSRED — ISSN 2581-7175 — Impact Factor 5.658 — Vol. 7, Issue 6 — Nov–Dec 2024' },
      { label: 'Stack', value: 'Python, TensorFlow, PyTorch, pandas, NumPy, Data Visualization' },
    ],
  },
]

const certs = [
  {
    name: 'Build Your Own Chatbot',
    org: 'IBM',
    icon: '🤖',
    href: 'https://drive.google.com/file/d/14zxZc8FRtXrVmRRDQ1ZlNSL8IZ9A0Qoh/view?usp=drivesdk', // TODO: replace with Credly URL
    desc: 'Issued by IBM — Credly Verified | Aug 2024',
  },
  {
    name: 'IoT Workshop',
    org: 'IIT Delhi',
    icon: '⚡',
    href: 'https://drive.google.com/file/d/1CuMHnhzSxuPhrFSIuwvDI04zIinP43Ks/view?usp=drivesdk', // TODO: replace with certificate URL
    desc: 'Organized by 5G Indigenous Test Bed O&M Team | Sep 2024',
  },
]

// macOS terminal modal for paper
function PaperModal({ paper, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(12px)' }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 'min(620px, 95vw)', borderRadius: 14, overflow: 'hidden', border: '1px solid #2a2a2a', boxShadow: '0 40px 120px rgba(0,0,0,0.9)' }}>

        {/* Title bar */}
        <div style={{ backgroundColor: '#1c1c1c', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid #2a2a2a' }}>
          <span onClick={onClose} style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#ff5f57', cursor: 'pointer', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#28c840', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#555', marginLeft: 'auto', letterSpacing: '0.05em' }}>
            paper_{paper.num}.md
          </span>
        </div>

        {/* Content */}
        <div style={{ backgroundColor: '#0d1117', padding: '2rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #1e1e1e' }}>
            <div style={{ color: paper.accent, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {paper.journal} · IF {paper.impact}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              {paper.title}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#555', marginTop: '0.5rem' }}>
              {paper.vol} · {paper.date} · ISSN {paper.issn}
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {paper.intro.map((d, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#555', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: '0.1rem' }}>
                  {d.label}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', color: '#ffffff', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#161b22', padding: '1rem 2rem', borderTop: '1px solid #2a2a2a', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          {paper.certHref && paper.certHref !== 'YOUR_CERT_1_URL_HERE' && paper.certHref !== 'YOUR_CERT_2_URL_HERE' && (
            <a href={paper.certHref} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', border: '1px solid #333', padding: '0.45rem 0.9rem', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='#f59e0b' }}
              onMouseLeave={e => { e.currentTarget.style.color='#888'; e.currentTarget.style.borderColor='#333' }}>
              CERTIFICATE ↗
            </a>
          )}
          {paper.href && paper.href !== 'YOUR_PAPER_1_URL_HERE' && paper.href !== 'YOUR_PAPER_2_URL_HERE' && (
            <a href={paper.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#000', backgroundColor: paper.accent, padding: '0.45rem 0.9rem', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity='0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity='1'}>
              READ PAPER ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Floating hover preview
function PaperPreview({ paper }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.92 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', right: '5%', top: '50%', transform: 'translateY(-50%)', width: 300, borderRadius: 14, background: paper.gradient, border: `1px solid ${paper.accent}25`, zIndex: 500, overflow: 'hidden', pointerEvents: 'none', boxShadow: `0 24px 80px rgba(0,0,0,0.7)`, padding: '1.5rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: paper.accent, marginBottom: '1rem', textTransform: 'uppercase' }}>
        {paper.journal} · IF {paper.impact}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#ffffff', lineHeight: 1.5, marginBottom: '1rem' }}>
        {paper.title}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#aaaaaa', lineHeight: 1.6 }}>
        {paper.preview}
      </div>
      <div style={{ marginTop: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555', display: 'flex', justifyContent: 'space-between' }}>
        <span>{paper.vol}</span><span>{paper.date}</span>
      </div>
    </motion.div>
  )
}

function PaperRow({ paper, index, inView, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <div style={{ height: 1, backgroundColor: '#1e1e1e' }} />
          <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ x: hovered ? 8 : 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => onOpen(paper)}
          style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1rem', padding: '2rem 0', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: hovered ? paper.accent : 'rgba(245,158,11,0.12)', lineHeight: 1, minWidth: '2.5rem', transition: 'color 0.3s' }}>
            {paper.num}
          </span>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', color: hovered ? '#ffffff' : '#dddddd', marginBottom: '0.5rem', lineHeight: 1.4, letterSpacing: '-0.01em', transition: 'color 0.2s' }}>
              {paper.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.06em' }}>
              <span style={{ color: paper.accent }}>{paper.journal}</span>
              <span style={{ color: '#555' }}>ISSN: {paper.issn}</span>
              <span style={{ color: '#555' }}>IF: <span style={{ color: '#888' }}>{paper.impact}</span></span>
              <span style={{ color: '#555' }}>{paper.vol} · {paper.date}</span>
            </div>
          </div>
          <motion.span animate={{ x: hovered ? 4 : 0, color: hovered ? paper.accent : '#444' }} style={{ fontSize: '1.1rem', flexShrink: 0 }}>→</motion.span>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {hovered && <PaperPreview paper={paper} />}
      </AnimatePresence>
    </>
  )
}

export default function Publications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openPaper, setOpenPaper] = useState(null)

  return (
    <section id="research" ref={ref} style={{ padding: '7rem 5%', borderTop: '1px solid #1a1a1a', minHeight: 'calc(100vh - 120px)' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: '3.5rem' }}>
        <span className="label">Research</span>
        <h2 className="heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Published Papers<span className="dot">.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#555', marginTop: '0.75rem', letterSpacing: '0.05em' }}>
          Hover for preview · Click to open details
        </p>
      </motion.div>

      {/* Papers */}
      <div style={{ marginBottom: '4rem' }}>
        {papers.map((paper, i) => (
          <PaperRow key={paper.num} paper={paper} index={i} inView={inView} onOpen={setOpenPaper} />
        ))}
        <div style={{ height: 1, backgroundColor: '#1e1e1e' }} />
      </div>

      {/* Certifications */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#555', marginBottom: '1.25rem' }}>
          Certifications
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {certs.map(cert => (
            <a key={cert.name}
              href={cert.href !== 'YOUR_IBM_CERT_URL_HERE' && cert.href !== 'YOUR_IIT_CERT_URL_HERE' ? cert.href : undefined}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1.4rem', backgroundColor: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', cursor: cert.href.startsWith('YOUR') ? 'default' : 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.transform = 'none' }}>
              <span style={{ fontSize: '1.3rem' }}>{cert.icon}</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{cert.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#888', marginTop: 2 }}>{cert.desc}</div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#f59e0b', marginLeft: '0.5rem' }}>↗</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* Terminal modal */}
      <AnimatePresence>
        {openPaper && <PaperModal paper={openPaper} onClose={() => setOpenPaper(null)} />}
      </AnimatePresence>
    </section>
  )
}
