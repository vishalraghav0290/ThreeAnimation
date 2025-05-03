"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const technologies = [
  { name: "React", icon: "📚" },
  { name: "Next.js", icon: "🔥" },
  { name: "TypeScript", icon: "📝" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Three.js", icon: "🧊" },
  { name: "Framer Motion", icon: "✨" },
  { name: "JavaScript", icon: "📜" },
  { name: "HTML5", icon: "🌐" },
  { name: "CSS3", icon: "🎭" },
  { name: "Git", icon: "🔄" },
  { name: "Node.js", icon: "🟢" },
  { name: "Redux", icon: "🔄" },
]

export default function TechStackSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="tech-stack" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          Tech Stack
        </motion.h2>

        {/* Tech grid with offset to avoid 3D model */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {technologies.map((tech, index) => (
            <TechCard key={index} tech={tech} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TechCard({ tech, index }) {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: index * 0.05 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-zinc-800/50 backdrop-blur-lg rounded-xl p-6 border border-zinc-700 flex flex-col items-center justify-center text-center hover:border-purple-500/50 transition-all duration-300"
    >
      <span className="text-4xl mb-3">{tech.icon}</span>
      <h3 className="font-medium text-zinc-200">{tech.name}</h3>
    </motion.div>
  )
}
