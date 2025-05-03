"use client"

import { useRef, useEffect } from "react"

export default function StartButton({ onClick, isAnimating }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    if (isAnimating && buttonRef.current) {
      // Add fade out animation when animation starts
      buttonRef.current.classList.add("opacity-0", "transition-opacity", "duration-500")

      // Remove button from DOM after animation completes
      const timer = setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.display = "none"
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="absolute z-10 px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105"
    >
      Start Experience
    </button>
  )
}
