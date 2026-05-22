'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    label: 'Core AI & ML',
    skills: [
      { name: 'PyTorch', icon: '🔥', color: '#ee4c2c', level: 80 },
      { name: 'scikit-learn', icon: '🤖', color: '#f7931e', level: 85 },
      { name: 'OpenCV', icon: '👁️', color: '#5c3ee8', level: 78 },
      { name: 'YOLO', icon: '⚡', color: '#00d4aa', level: 82 },
      { name: 'spaCy', icon: '🐍', color: '#09a3d5', level: 75 },
      { name: 'HuggingFace', icon: '🤗', color: '#ffd21e', level: 88 },
    ],
  },
  {
    label: 'Generative AI & LLMs',
    skills: [
      { name: 'LangChain', icon: '🔗', color: '#1c7a24', level: 90 },
      { name: 'LangGraph', icon: '🕸️', color: '#7c3aed', level: 85 },
      { name: 'FAISS', icon: '🗂️', color: '#0078d4', level: 88 },
      { name: 'Groq', icon: '⚡', color: '#ff6b35', level: 87 },
      { name: 'OpenAI GPT', icon: '🧠', color: '#412991', level: 83 },
      { name: 'Google Gemini', icon: '✦', color: '#4285f4', level: 75 },
    ],
  },
  {
    label: 'Backend & APIs',
    skills: [
      { name: 'Python', icon: '🐍', color: '#3776ab', level: 92 },
      { name: 'FastAPI', icon: '⚡', color: '#009688', level: 85 },
      { name: 'Flask', icon: '🌶️', color: '#888', level: 80 },
      { name: 'SQLite', icon: '🗄️', color: '#003b57', level: 78 },
      { name: 'Streamlit', icon: '🎯', color: '#ff4b4b', level: 90 },
      { name: 'Arduino', icon: '🔌', color: '#00979d', level: 70 },
    ],
  },
  {
    label: 'Frontend & Infra',
    skills: [
      { name: 'Next.js', icon: '▲', color: '#ffffff', level: 72 },
      { name: 'React', icon: '⚛️', color: '#61dafb', level: 70 },
      { name: 'Supabase', icon: '⚡', color: '#3ecf8e', level: 75 },
      { name: 'Vercel', icon: '▲', color: '#ffffff', level: 80 },
      { name: 'Sentence-Transformers', icon: '🔤', color: '#e97627', level: 85 },
      { name: 'WebRTC', icon: '📡', color: '#333eaf', level: 65 },
    ],
  },
]

function SkillCard({ name, icon, color, level, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{ padding: '1rem 1.25rem', backgroundColor: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '8px', cursor: 'default', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e1e'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{icon}</div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff', fontWeight: 500 }}>{name}</span>
      </div>
      {/* Progress bar */}
      <div style={{ height: 2, backgroundColor: '#1e1e1e', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
          style={{ height: '100%', backgroundColor: color === '#ffffff' ? '#f59e0b' : color, borderRadius: 2, opacity: 0.7 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} style={{ padding: '7rem 5%', borderTop: '1px solid #1a1a1a' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: '4rem' }}>
        <span className="label">Expertise</span>
        <h2 className="heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Skills &amp; Tools<span className="dot">.</span></h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {categories.map((cat) => (
          <div key={cat.label}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#444', marginBottom: '1.25rem' }}>{cat.label}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
              {cat.skills.map((skill, i) => <SkillCard key={skill.name} {...skill} index={i} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
