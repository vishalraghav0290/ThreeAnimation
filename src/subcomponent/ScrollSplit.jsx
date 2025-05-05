import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrollSplit({ canvasComponent }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Initial split screen transition
  const topHeight = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    ["50vh", "0vh"]
  );
  
  const bottomHeight = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    ["50vh", "100vh"]
  );

  // Bottom color transition - fix array lengths to match
  const bottomBgColor = useTransform(
    scrollYProgress,
    [0.3, 0.5],  // 2 input values
    ["white", "red"]  // 2 output values
  );

  // Top color transition - already correct
  const topBgColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["blue", "white"]
  );

  // Three column layout transition
  const leftWidth = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["0%", "33.33%"]
  );

  const rightWidth = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["0%", "33.33%"]
  );

  const centerWidth = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["100%", "33.33%"]
  );

  // Text styling and positioning
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0]
  );

  return (
    <>
      {/* Scrollable container to enable scrolling */}
      <div ref={containerRef} className="w-full h-[300vh]"></div>
      
      {/* Fixed visual elements container */}
      <div className="fixed inset-0 flex flex-col overflow-hidden">
        {/* Top half - blue */}
        <motion.div 
          className="w-full bg-blue-700"
          style={{ height: topHeight }}
        />
        
        <motion.div
          className="w-full h-[50vh]" // Adjust height as needed
          style={{ backgroundColor: topBgColor }}
        >
          {/* Content for the top section */}
        </motion.div>

        {/* Bottom half - transitions from white to red, then splits into 3 columns */}
        <motion.div 
          className="w-full relative"
          style={{ 
            height: bottomHeight,
            backgroundColor: bottomBgColor 
          }}
        >
          {/* The 3D text that appears on first screen */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ opacity: textOpacity }}
          >
            <h1 className="text-black text-9xl font-mono font-medium">3D Animation</h1>
          </motion.div>
          
          {/* Three column layout that appears when scrolled further */}
          <div className="flex h-full w-full">
            {/* Left column */}
            <motion.div 
              className="h-full bg-purple-500"
              style={{ width: leftWidth }}
            />
            
            {/* Middle column - 3D model container */}
            <motion.div 
              className="h-full flex items-center justify-center bg-transparent"
              style={{ width: centerWidth }}
            >
              {canvasComponent}
            </motion.div>
            
            {/* Right column */}
            <motion.div 
              className="h-full bg-emerald-500"
              style={{ width: rightWidth }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default ScrollSplit;