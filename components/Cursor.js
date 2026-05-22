'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    let raf
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.15
      cur.current.y += (pos.current.y - cur.current.y) * 0.15
      dot.style.transform = `translate(${cur.current.x - 6}px, ${cur.current.y - 6}px)`
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={dotRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: 12, height: 12, borderRadius: '50%',
      border: '2px solid #f59e0b',
      pointerEvents: 'none', zIndex: 9999,
      mixBlendMode: 'difference',
    }} />
  )
}
