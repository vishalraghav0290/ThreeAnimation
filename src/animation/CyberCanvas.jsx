"use client"

import { useRef, useState, useEffect } from "react"

export default function CyberCanvas({ isAnimating, setIsLoading, setLoadError = () => {} }) {
  const canvasRef = useRef(null)
  const requestIdRef = useRef(null)
  const imagesRef = useRef([])
  const [currentFrame, setCurrentFrame] = useState(0)
  const [totalFrames, setTotalFrames] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Debug function to test canvas drawing
  const testCanvasDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw a colorful test pattern to verify canvas is working
    ctx.fillStyle = "red"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = "white"
    ctx.font = "30px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Canvas Test - If you see this, canvas is working", canvas.width / 2, canvas.height / 2)
    
    console.log("Test pattern drawn to canvas")
  }

  // Load all images
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Test canvas drawing immediately to verify it works
        testCanvasDrawing()
        
        const frameCount = 300
        const loadedImages = []
        let loadedCount = 0
        let errorCount = 0

        for (let i = 1; i <= frameCount; i++) {
          // Use 4-digit padding based on your file listing
          const frameNumber = i.toString().padStart(4, "0")
          const img = new Image()
          
          // Use the correct path based on your file structure
          const imagePath = `/CYBERFICTION-IMAGES/male${frameNumber}.png`
          
          img.onload = () => {
            loadedCount++
            loadedImages[i-1] = img // Ensure correct order
            setImagesLoaded(loadedCount)
            
            if (loadedCount === 1) {
              // Test draw the first image when it loads
              console.log("First image loaded, testing drawing...")
              const canvas = canvasRef.current
              if (canvas) {
                const ctx = canvas.getContext("2d")
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                console.log("Test drawing of first image complete")
              }
            }

            if (loadedCount === frameCount - errorCount) {
              console.log(`All available images loaded: ${loadedCount} frames`)
              setTotalFrames(loadedCount)
              setIsLoading(false)
            }
          }

          img.onerror = () => {
            errorCount++
            console.error(`Failed to load image ${imagePath}`)

            if (i === frameCount || errorCount === frameCount) {
              if (loadedCount > 0) {
                console.log(`Finished loading with ${loadedCount} successful frames and ${errorCount} failed frames`)
                setTotalFrames(loadedCount)
                setIsLoading(false)
              } else {
                setLoadError(true)
                console.error("No images could be loaded. Please check the image path.")
                setIsLoading(false)
              }
            }
          }

          img.src = imagePath
          loadedImages.push(img)
        }

        imagesRef.current = loadedImages
      } catch (error) {
        console.error("Error in image loading process:", error)
        setIsLoading(false)
        setLoadError(true)
      }
    }

    loadImages()

    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      
      // Redraw test pattern when resized
      testCanvasDrawing()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsLoading, setLoadError])

  // Animation loop
  useEffect(() => {
    console.log("Animation effect running with isAnimating:", isAnimating, "totalFrames:", totalFrames)
    
    if (!isAnimating || totalFrames === 0) {
      console.log("Animation not starting - requirements not met")
      return
    }

    console.log("Starting animation with", totalFrames, "frames")
    
    let frameCount = 0
    const fps = 30
    const frameDuration = 1000 / fps
    let lastFrameTime = 0

    const animate = (timestamp) => {
      if (!lastFrameTime) lastFrameTime = timestamp
      const elapsed = timestamp - lastFrameTime

      if (elapsed > frameDuration) {
        lastFrameTime = timestamp - (elapsed % frameDuration)

        // Update frame
        frameCount = (frameCount + 1) % totalFrames
        setCurrentFrame(frameCount)

        // Draw frame
        const canvas = canvasRef.current
        if (!canvas) {
          console.error("Canvas reference is null")
          return
        }

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          console.error("Could not get canvas context")
          return
        }

        // Get the image for current frame
        const img = imagesRef.current[frameCount]

        if (img && img.complete) {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          
          // Draw image centered on canvas
          const imgAspect = img.width / img.height
          const canvasAspect = canvas.width / canvas.height
          
          let drawWidth, drawHeight, offsetX, offsetY
          
          if (imgAspect > canvasAspect) {
            drawHeight = canvas.height
            drawWidth = drawHeight * imgAspect
            offsetX = (canvas.width - drawWidth) / 2
            offsetY = 0
          } else {
            drawWidth = canvas.width
            drawHeight = drawWidth / imgAspect
            offsetX = 0
            offsetY = (canvas.height - drawHeight) / 2
          }
          
          // If this is the first frame and first render, log drawing info
          if (frameCount === 0) {
            console.log(`Drawing image: ${img.width}x${img.height} on canvas: ${canvas.width}x${canvas.height}`)
            console.log(`Draw params: width=${drawWidth}, height=${drawHeight}, x=${offsetX}, y=${offsetY}`)
          }
          
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        } else {
          console.warn(`Frame ${frameCount} image not loaded or incomplete`)
          ctx.fillStyle = "black"
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = "white"
          ctx.font = "24px Arial"
          ctx.textAlign = "center"
          ctx.fillText(`Image not available for frame ${frameCount}`, canvas.width / 2, canvas.height / 2)
        }
      }

      requestIdRef.current = requestAnimationFrame(animate)
    }

    requestIdRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current)
      }
    }
  }, [isAnimating, totalFrames])

  useEffect(() => {
    // Prevent scroll on canvas
    const preventDefault = (e) => e.preventDefault();
    
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <div style={{ 
      overflow: 'hidden',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex:50
    }}>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          
        }}
      />
    </div>
  )
}