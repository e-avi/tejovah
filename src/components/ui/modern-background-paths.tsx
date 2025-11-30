"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ThemeToggle } from "../ThemeToggle"
import { Button } from "../../components/ui/button"

// Geometric Grid Paths
function GeometricPaths() {
  const gridSize = 40
  const paths = []
  
  for (let x = 0; x < 20; x++) {
    for (let y = 0; y < 12; y++) {
      if (Math.random() > 0.7) {
        paths.push({
          id: `grid-${x}-${y}`,
          d: `M${x * gridSize},${y * gridSize} L${(x + 1) * gridSize},${y * gridSize} L${(x + 1) * gridSize},${(y + 1) * gridSize} L${x * gridSize},${(y + 1) * gridSize} Z`,
          delay: Math.random() * 5,
        })
      }
    }
  }

  return (
    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 480">
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0], 
            opacity: [0, 0.6, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  )
}

// Organic Flow Paths
function FlowPaths() {
  const flowPaths = Array.from({ length: 12 }, (_, i) => {
    const amplitude = 50 + i * 10
    const frequency = 0.01 + i * 0.002
    const offset = i * 60
    
    return {
      id: `flow-${i}`,
      d: `M-100,${200 + offset} Q200,${200 + offset - amplitude} 500,${200 + offset} T900,${200 + offset}`,
      strokeWidth: 1 + i * 0.3,
      opacity: 0.1 + i * 0.05,
      delay: i * 0.8
    }
  })

  return (
    <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 800 800">
      {flowPaths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: [0, 1, 0.8, 0],
            opacity: [0, path.opacity, path.opacity * 0.7, 0]
          }}
          transition={{
            duration: 15,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  )
}

// Neural Network Paths
function NeuralPaths() {
  const nodes = Array.from({ length: 50 }, (_, i) => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
    id: `node-${i}`
  }))

  const connections = []
  nodes.forEach((node, i) => {
    const nearbyNodes = nodes.filter((other, j) => {
      if (i === j) return false
      const distance = Math.sqrt(Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2))
      return distance < 120 && Math.random() > 0.6
    })
    
    nearbyNodes.forEach(target => {
      connections.push({
        id: `conn-${i}-${target.id}`,
        d: `M${node.x},${node.y} L${target.x},${target.y}`,
        delay: Math.random() * 10
      })
    })
  })

  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 600">
      {connections.map((conn) => (
        <motion.path
          key={conn.id}
          d={conn.d}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 6,
            delay: conn.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, 0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  )
}

export default function ModernBackgroundPaths({
  title = "Tejovah",
}: {
  title?: string
}) {
  const [currentPattern, setCurrentPattern] = useState(0)
  const patterns = ['neural', 'flow', 'geometric']
  const words = title.split(" ")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPattern((prev) => (prev + 1) % patterns.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  const renderPattern = () => {
    switch (currentPattern) {
      case 0: return <NeuralPaths />
      case 1: return <FlowPaths />
      case 2: return <GeometricPaths />
      default: return <NeuralPaths />
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 text-blue-400/60 dark:text-slate-400">
        <motion.div
          key={currentPattern}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          {renderPattern()}
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-purple-100/30 dark:from-slate-900/60 dark:via-transparent dark:to-slate-900/60" />
      
      {/* Noise Texture Overlay for Light Mode */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-0 mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
             backgroundRepeat: 'repeat',
             backgroundSize: '200px 200px'
           }} 
      />

      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-6 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: wordIndex * 0.15 + letterIndex * 0.05,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      duration: 0.8
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-br from-slate-900 via-blue-800 to-purple-700
                                        dark:from-white dark:via-slate-200 dark:to-slate-400
                                        hover:from-blue-600 hover:to-purple-600 dark:hover:from-blue-400 dark:hover:to-purple-400
                                        transition-all duration-700 cursor-default
                                        drop-shadow-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
          <br />
          <br />
          {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 font-light tracking-wide max-w-2xl mx-auto drop-shadow-sm"
            >
              Your product deserves more than code. <br /> It deserves thoughtful architecture, clean design, and a team committed to building software that lasts.
            </motion.p>

            <br />

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 100 }}
            className="inline-block group"
          >
            <div className="relative p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative rounded-[14px] px-12 py-6 text-lg font-semibold
                            bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800
                            text-slate-900 dark:text-white transition-all duration-300
                            group-hover:-translate-y-1 group-hover:shadow-2xl
                            border-0 backdrop-blur-sm"
              >
                  <motion.span 
                  className="flex items-center gap-3"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative">
                    Let's build something together
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xl"
                  >
                    →
                  </motion.span>
                </motion.span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500/40 dark:bg-blue-500/20 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-3/4 right-1/3 w-6 h-6 bg-purple-500/40 dark:bg-purple-500/20 rounded-full blur-sm"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.8, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/6 w-8 h-8 bg-pink-500/35 dark:bg-pink-500/18 rounded-full blur-md"
        animate={{
          y: [0, 25, 0],
          x: [0, -12, 0],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-5 h-5 bg-teal-500/40 dark:bg-teal-500/20 rounded-full blur-sm"
        animate={{
          y: [0, -18, 0],
          x: [0, 8, 0],
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.85, 0.5]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-2/3 w-7 h-7 bg-indigo-500/38 dark:bg-indigo-500/19 rounded-full blur-md"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 0.9, 1],
          opacity: [0.55, 0.8, 0.55]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute top-2/3 right-1/5 w-3 h-3 bg-cyan-500/45 dark:bg-cyan-500/22 rounded-full blur-sm"
        animate={{
          y: [0, -22, 0],
          x: [0, 15, 0],
          scale: [1, 1.4, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/5 left-1/2 w-6 h-6 bg-violet-500/36 dark:bg-violet-500/18 rounded-full blur-md"
        animate={{
          y: [0, 18, 0],
          x: [0, -8, 0],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.75, 0.5]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 right-2/3 w-4 h-4 bg-fuchsia-500/42 dark:bg-fuchsia-500/21 rounded-full blur-sm"
        animate={{
          y: [0, -16, 0],
          x: [0, 12, 0],
          scale: [1, 1.25, 1],
          opacity: [0.55, 0.85, 0.55]
        }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute top-1/6 right-1/6 w-5 h-5 bg-rose-500/38 dark:bg-rose-500/19 rounded-full blur-md"
        animate={{
          y: [0, 24, 0],
          x: [0, -14, 0],
          scale: [1, 0.85, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
      />
      <motion.div
        className="absolute bottom-1/5 left-1/5 w-9 h-9 bg-amber-500/32 dark:bg-amber-500/16 rounded-full blur-lg"
        animate={{
          y: [0, -20, 0],
          x: [0, 18, 0],
          scale: [1, 1.2, 1],
          opacity: [0.45, 0.7, 0.45]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      <motion.div
        className="absolute top-3/5 left-3/5 w-4 h-4 bg-emerald-500/40 dark:bg-emerald-500/20 rounded-full blur-sm"
        animate={{
          y: [0, 16, 0],
          x: [0, -11, 0],
          scale: [1, 1.35, 1],
          opacity: [0.6, 0.88, 0.6]
        }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-2/5 right-1/2 w-7 h-7 bg-sky-500/35 dark:bg-sky-500/17 rounded-full blur-md"
        animate={{
          y: [0, -19, 0],
          x: [0, 9, 0],
          scale: [1, 0.95, 1],
          opacity: [0.52, 0.82, 0.52]
        }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut", delay: 4.2 }}
      />
    </div>
  )
}