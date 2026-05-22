'use client'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dhruv Singh — AI/ML Engineer</title>
        <meta name="description" content="AI/ML Engineer & AI Developer. LangGraph, RAG, multi-agent pipelines. GGSIPU Delhi. Immediate joiner." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="grain" />
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
