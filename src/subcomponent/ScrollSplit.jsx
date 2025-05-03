import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrollSplit() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values based on scroll position
  const topSectionHeight = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6], 
    ["50%", "0%", "0%"]
  );
  
  const bottomSectionHeight = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.6], 
    ["50%", "100%", "100%"]
  );
  
  const columnWidth = useTransform(
    scrollYProgress,
    [0.3, 0.6, 0.7],
    ["100%", "100%", "33.33%"]
  );

  const middleColumnVisibility = useTransform(
    scrollYProgress,
    [0.6, 0.7],
    [0, 1]
  );

  const bottomBackground = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4],
    ["white", "white", "red"]
  );

  // Create space for scrolling
  const containerHeight = "300vh"; // 3x the viewport height to allow scrolling

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {/* Fixed container that stays in view while scrolling */}
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col overflow-hidden">
        {/* Top section - blue */}
        <motion.div 
          className="w-full bg-blue-700"
          style={{ height: topSectionHeight }}
        />
        
        {/* Bottom section - initially white, then red, then splits into columns */}
        <motion.div 
          className="w-full flex flex-row"
          style={{ 
            height: bottomSectionHeight,
            backgroundColor: bottomBackground 
          }}
        >
          {/* When scrolled further, this transforms into 3 columns */}
          <motion.div 
            className="h-full bg-yellow-500"
            style={{ width: columnWidth }}
          />
          
          {/* Middle column for 3D model */}
          <motion.div 
            className="h-full flex items-center justify-center"
            style={{ 
              width: columnWidth,
              opacity: middleColumnVisibility
            }}
          >
            <div className="text-black text-4xl font-mono">
              3D Model Goes Here
            </div>
          </motion.div>
          
          {/* Right column */}
          <motion.div 
            className="h-full bg-green-500"
            style={{ 
              width: columnWidth,
              opacity: middleColumnVisibility
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ScrollSplit;