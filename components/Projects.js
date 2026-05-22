'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: '01', name: 'Medical AI Assistant', category: 'MULTI-AGENT',
    accent: '#22d3ee',
    desc: 'Multi-agent post-discharge care system with RAG on a 1,547-page nephrology textbook. LangGraph orchestration, patient ID via SQLite, triage (IMMEDIATE vs ROUTINE), DuckDuckGo web search fallback, and MemorySaver for conversation context.',
    details: [
      { label: 'Type', value: 'Multi-Agent System' },
      { label: 'Stack', value: 'LangGraph, LangChain, Groq Llama 3.3 70B, FAISS, FastAPI, SQLite, Streamlit' },
      { label: 'Data', value: '1,547-page nephrology textbook (RAG)' },
      { label: 'Agents', value: 'Router → Patient ID → Medical RAG → Web Search' },
      { label: 'Triage', value: 'IMMEDIATE vs ROUTINE assessment' },
      { label: 'Memory', value: 'LangGraph MemorySaver — persistent multi-turn context' },
      { label: 'Status', value: 'DEPLOYED ✓' },
    ],
    github: 'https://github.com/kunwardhruv/medical-ai-assistant', live: null,
    tags: ['LangGraph', 'LangChain', 'Groq Llama 3.3 70B', 'FAISS', 'FastAPI', 'SQLite', 'Streamlit'],
  },
  {
    id: '02', name: 'Legal Contract Analyzer', category: 'RAG',
    accent: '#f59e0b',
    desc: 'RAG pipeline for legal contract analysis with FAISS. Resolved ChromaDB tenant-state corruption achieving 10x latency improvement. HIGH/MEDIUM/LOW risk classification across 8 clause types.',
    details: [
      { label: 'Type', value: 'RAG Pipeline' },
      { label: 'Stack', value: 'LangChain, FAISS, Groq Llama 3.3 70B, HuggingFace, PyMuPDF, Pydantic, Streamlit' },
      { label: 'Vector DB', value: 'FAISS (migrated from ChromaDB — 10x latency improvement)' },
      { label: 'Output', value: 'HIGH / MEDIUM / LOW risk across 8 clause types' },
      { label: 'Chunking', value: 'Regex-based legal clause boundary detection' },
      { label: 'Status', value: 'LIVE — legal-contract-analyzer.streamlit.app ✓' },
    ],
    github: 'https://github.com/kunwardhruv/-legal-contract-analyzer',
    live: 'https://legal-contract-analyzer.streamlit.app',
    tags: ['LangChain', 'FAISS', 'Groq', 'HuggingFace', 'PyMuPDF', 'Pydantic', 'Streamlit'],
  },
  {
    id: '03', name: 'JSO Trust Agent', category: 'AGENTIC',
    accent: '#a78bfa',
    desc: '8-step agentic pipeline: event ingestion → Supabase DB reads → AI NLP analysis → trust scoring → DB writes → real-time dashboard → S3 archiving → audit logging. AariyaTech Corp assignment.',
    details: [
      { label: 'Type', value: '8-Step Agentic Pipeline' },
      { label: 'Stack', value: 'Next.js, LangGraph, Groq Llama 3.3 70B, Supabase, Vercel' },
      { label: 'Pipeline', value: 'Ingestion → DB Read → NLP → Trust Score → DB Write → Dashboard → S3 → Audit' },
      { label: 'Database', value: 'Supabase (real-time reads + writes)' },
      { label: 'Client', value: 'AariyaTech Corp technical assignment' },
      { label: 'Status', value: 'LIVE — jso-trust-agent.vercel.app ✓' },
    ],
    github: 'https://github.com/kunwardhruv/jso-trust-agent',
    live: 'https://jso-trust-agent.vercel.app',
    tags: ['Next.js', 'LangGraph', 'Groq Llama 3.3 70B', 'Supabase', 'Vercel'],
  },
  {
    id: '04', name: 'AI Resume Screener', category: 'NLP',
    accent: '#34d399',
    desc: 'NLP-powered resume screening with semantic similarity scoring. Multi-factor ranking across keywords, experience, education, certifications. Also published as research paper in IRJMETS (IF: 8.187).',
    details: [
      { label: 'Type', value: 'NLP Semantic Ranking System' },
      { label: 'Stack', value: 'Python, spaCy, Sentence-Transformers (all-MiniLM-L6-v2), scikit-learn, Streamlit' },
      { label: 'Scoring', value: 'Weighted: keywords + experience + education + certifications' },
      { label: 'Embeddings', value: 'all-MiniLM-L6-v2 semantic similarity' },
      { label: 'Published', value: 'IRJMETS — ISSN 2582-5208 — Impact Factor 8.187 — Nov 2025' },
    ],
    github: 'https://github.com/kunwardhruv', live: null,
    tags: ['Python', 'spaCy', 'Sentence-Transformers', 'scikit-learn', 'Streamlit'],
  },
  {
    id: '05', name: 'Whisper Hindi Fine-Tune', category: 'LLM',
    accent: '#fb923c',
    desc: 'Fine-tuned OpenAI Whisper-small on ~12 hours of Hindi audio. Reduced Word Error Rate from 78% → 44% with custom advanced_fix() post-processing function. Josh Talks assignment.',
    details: [
      { label: 'Type', value: 'LLM Fine-Tuning (Speech)' },
      { label: 'Stack', value: 'HuggingFace, Whisper-small, Google Colab' },
      { label: 'Data', value: '~12 hours Hindi audio dataset' },
      { label: 'WER Before', value: '78%' },
      { label: 'WER After', value: '44% (44% improvement)' },
      { label: 'Post-processing', value: 'Custom advanced_fix() with full error taxonomy' },
      { label: 'Client', value: 'Josh Talks technical assignment' },
    ],
    github: 'https://github.com/kunwardhruv', live: null,
    tags: ['HuggingFace', 'Whisper', 'Google Colab', 'Audio ML', 'WER'],
  },
  {
    id: '06', name: 'ProctorAI', category: 'CV',
    accent: '#22d3ee',
    desc: 'Browser-based AI proctoring — zero backend. Real-time face detection via face-api.js, WebRTC, tab-switch detection, clipboard blocking, graduated violation scoring system.',
    details: [
      { label: 'Type', value: 'Computer Vision (Browser)' },
      { label: 'Stack', value: 'face-api.js, WebRTC, Vanilla JS, HTML/CSS' },
      { label: 'Backend', value: 'None — 100% frontend' },
      { label: 'Features', value: 'Face detection, tab-switch detection, clipboard blocking' },
      { label: 'Scoring', value: 'Graduated violation system (warnings → disqualification)' },
      { label: 'Client', value: 'Sure4Job — deployed via GitHub Classroom' },
    ],
    github: 'https://github.com/kunwardhruv', live: null,
    tags: ['face-api.js', 'WebRTC', 'Vanilla JS', 'HTML/CSS'],
  },
]

const filters = ['ALL', 'RAG', 'MULTI-AGENT', 'AGENTIC', 'NLP', 'LLM', 'CV']

// macOS terminal modal — clean details, NO code
function TerminalModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(12px)' }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 'min(620px, 95vw)', borderRadius: 14, overflow: 'hidden', border: '1px solid #2a2a2a', boxShadow: '0 40px 120px rgba(0,0,0,0.9)' }}>

        {/* macOS title bar */}
        <div style={{ backgroundColor: '#1c1c1c', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid #2a2a2a' }}>
          <span onClick={onClose} style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#ff5f57', cursor: 'pointer', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ width: 13, height: 13, borderRadius: '50%', backgroundColor: '#28c840', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#555', marginLeft: 'auto', letterSpacing: '0.05em' }}>
            {project.name.toLowerCase().replace(/ /g, '_')}.md
          </span>
        </div>

        {/* Content — clean details */}
        <div style={{ backgroundColor: '#0d1117', padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 1.7, maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Project name header */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #1e1e1e' }}>
            <div style={{ color: project.accent, fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {project.category}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
              {project.name}
            </div>
            <div style={{ color: '#777', fontSize: '0.8rem', marginTop: '0.5rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              {project.desc}
            </div>
          </div>

          {/* Key details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {project.details.map((d, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '1rem', alignItems: 'start' }}>
                <span style={{ color: '#555', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: '0.1rem' }}>
                  {d.label}
                </span>
                <span style={{ color: d.label === 'Status' ? '#22c55e' : '#cccccc', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ backgroundColor: '#161b22', padding: '1rem 2rem', borderTop: '1px solid #2a2a2a', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tags.slice(0, 4).map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.2rem 0.6rem', border: `1px solid ${project.accent}30`, color: project.accent, borderRadius: 4 }}>{t}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888', border: '1px solid #333', padding: '0.4rem 0.9rem', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='#f59e0b' }}
                onMouseLeave={e => { e.currentTarget.style.color='#888'; e.currentTarget.style.borderColor='#333' }}>
                GITHUB ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#000', backgroundColor: '#f59e0b', border: 'none', padding: '0.4rem 0.9rem', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor='#d97706'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor='#f59e0b'}>
                LIVE ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectRow({ project, index, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>
      <div style={{ height: 1, backgroundColor: '#1e1e1e' }} />

      {/* Row header — hover to expand inline */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onOpen(project)}
        animate={{ x: hovered ? 8 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem 0', cursor: 'pointer', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: hovered ? '#f59e0b' : '#444', letterSpacing: '0.05em', minWidth: '1.5rem', transition: 'color 0.2s' }}>
            {project.id}
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: hovered ? '#ffffff' : '#dddddd', transition: 'color 0.2s', letterSpacing: '-0.01em' }}>
            {project.name}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', color: hovered ? '#f59e0b' : '#555', transition: 'color 0.2s' }}>
            {project.category}
          </span>
          <motion.span animate={{ x: hovered ? 4 : 0, color: hovered ? '#f59e0b' : '#444' }} style={{ fontSize: '1.1rem', display: 'inline-block' }}>→</motion.span>
        </div>
      </motion.div>

      {/* Inline expand on hover — like Screenshot 1 */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hover-preview"
            style={{ overflow: 'hidden' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div style={{ paddingBottom: '2rem', paddingLeft: '3.2rem' }}>
              {/* Description */}
              <p style={{ color: '#aaaaaa', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.75, maxWidth: 640, marginBottom: '1.25rem' }}>
                {project.desc}
              </p>
              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {project.tags.map(t => (
                  <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.3rem 0.75rem', border: '1px solid #2a2a2a', color: '#cccccc', borderRadius: 4, letterSpacing: '0.04em' }}>{t}</span>
                ))}
              </div>
              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.4)', padding: '0.5rem 1.1rem', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor='#f59e0b'; e.currentTarget.style.color='#000' }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#f59e0b' }}>
                    GITHUB ↗
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: '#888', border: '1px solid #333', padding: '0.5rem 1.1rem', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='#f59e0b' }}
                    onMouseLeave={e => { e.currentTarget.style.color='#888'; e.currentTarget.style.borderColor='#333' }}>
                    LIVE DEMO ↗
                  </a>
                )}
                <button
                  onClick={() => onOpen(project)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', color: '#555', border: '1px solid #222', padding: '0.5rem 1.1rem', borderRadius: 4, background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#ffffff'; e.currentTarget.style.borderColor='#555' }}
                  onMouseLeave={e => { e.currentTarget.style.color='#555'; e.currentTarget.style.borderColor='#222' }}>
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [openProject, setOpenProject] = useState(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const filtered = activeFilter === 'ALL' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" ref={ref} style={{ padding: '7rem 5%', borderTop: '1px solid #1a1a1a', minHeight: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="label">Portfolio</span>
          <h2 className="heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Selected Work<span className="dot">.</span></h2>
        </motion.div>
        <motion.a initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          href="https://github.com/kunwardhruv" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#ffffff', textDecoration: 'none', border: '1px solid #3a3a3a', padding: '0.6rem 1.2rem', borderRadius: '4px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#f59e0b'; e.currentTarget.style.color='#f59e0b' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='#3a3a3a'; e.currentTarget.style.color='#ffffff' }}>
          ⌥ GITHUB
        </motion.a>
      </div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
        style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', padding: '0.45rem 0.9rem', border: `1px solid ${activeFilter===f ? '#f59e0b' : '#2a2a2a'}`, backgroundColor: 'transparent', color: activeFilter===f ? '#f59e0b' : '#ffffff', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}>
            {f}
          </button>
        ))}
      </motion.div>

      {/* List */}
      <div>
        {filtered.map((p, i) => <ProjectRow key={p.id} project={p} index={i} onOpen={setOpenProject} />)}
        <div style={{ height: 1, backgroundColor: '#1e1e1e' }} />
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#444', marginTop: '1.25rem', letterSpacing: '0.05em' }}>
        Hover to preview · Click "View Details" for full info
      </p>

      {/* Terminal modal */}
      <AnimatePresence>
        {openProject && <TerminalModal project={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  )
}
