"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left column - content (reversed from normal layout) */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-zinc-800/50 backdrop-blur-lg p-8 rounded-2xl border border-zinc-700"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            About Me
          </motion.h2>

          <motion.p variants={itemVariants} className="text-zinc-300 mb-6">
            I'm a passionate Frontend Developer and Computer Science student with a keen eye for creating beautiful,
            interactive web experiences. My journey in web development started with a curiosity about how websites work,
            and has evolved into a deep passion for crafting engaging user interfaces.
          </motion.p>

          <motion.p variants={itemVariants} className="text-zinc-300 mb-6">
            Currently pursuing my degree in Computer Science, I balance my academic studies with practical development
            work, constantly exploring new technologies and design patterns to enhance my skills.
          </motion.p>

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center">
              <span className="text-purple-400 font-medium w-32">Education:</span>
              <span className="text-zinc-300">B.Tech in Computer Science</span>
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 font-medium w-32">Location:</span>
              <span className="text-zinc-300">India</span>
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 font-medium w-32">Experience:</span>
              <span className="text-zinc-300">3+ years in Frontend Development</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column - empty space for 3D model */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  )
}
