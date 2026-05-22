'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = 16
    const increment = target / (1600 / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref} style={{ color: '#f59e0b' }}>{count}{suffix}</span>
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ padding: '7rem 5%', borderTop: '1px solid #1a1a1a', minHeight: 'calc(100vh - 120px)' }}>
      {/* Two-column */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '5rem' }}>
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="label">About Me</span>
          <h2 className="heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Building AI systems<br />that actually matter<span className="dot">.</span>
          </h2>
        </motion.div>

        {/* Right — ALL WHITE */}
        <motion.div initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1.25rem' }}>
          <p style={{ color: '#ffffff', fontWeight: 400, lineHeight: 1.85, fontSize: '1rem' }}>
            I'm Dhruv Singh, a final-year B.Tech CSE student at GGSIPU Delhi (2022–2026), specializing in AI/ML and Agentic AI systems. I design and build end-to-end intelligent systems — from multi-agent LangGraph pipelines and RAG architectures to fine-tuned LLMs and real-time computer vision models.
          </p>
          <p style={{ color: '#dddddd', fontWeight: 400, lineHeight: 1.85, fontSize: '1rem' }}>
            With two onsite internships (QVOLV Technologies, Delhi & HRS Navigation, Bengaluru) and six production projects deployed, I bring a strong bias toward building things that actually work — not just prototypes. I've published two research papers and am actively seeking AI/ML roles.
          </p>
          <p style={{ color: '#cccccc', fontWeight: 400, lineHeight: 1.85, fontSize: '1rem' }}>
            Immediate joiner — open to relocation anywhere in India.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
        style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', paddingTop: '3rem', borderTop: '1px solid #1e1e1e' }}>
        {[
          { num: 2, suffix: '+', label: 'Internships Completed' },
          { num: 6, suffix: '+', label: 'Projects Deployed' },
          { num: 2, suffix: '', label: 'Research Papers' },
          { num: 95, suffix: '%+', label: 'YOLO Detection Accuracy' },
        ].map(s => (
          <div key={s.label}>
            <div className="heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '0.5rem' }}>
              <Counter target={s.num} suffix={s.suffix} />
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ffffff' }}>
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
