"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with cart functionality and payment integration.",
    tech: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio website showcasing projects and skills with 3D elements.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description: "A productivity application for managing tasks with drag-and-drop functionality.",
    tech: ["React", "TypeScript", "Redux", "Styled Components"],
    link: "#",
    github: "#",
  },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
        >
          My Projects
        </motion.h2>

        {/* Projects grid with offset to avoid 3D model */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      className="bg-zinc-800/50 backdrop-blur-lg rounded-2xl p-6 border border-zinc-700 hover:border-purple-500/50 transition-all duration-300 group"
    >
      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{project.title}</h3>
      <p className="text-zinc-400 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech, i) => (
          <span key={i} className="text-xs px-3 py-1 rounded-full bg-zinc-700 text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex space-x-4">
        <a
          href={project.link}
          className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={16} />
          <span>Live Demo</span>
        </a>
        <a
          href={project.github}
          className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} />
          <span>Source Code</span>
        </a>
      </div>
    </motion.div>
  )
}
