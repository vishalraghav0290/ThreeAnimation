import CanvasContainer from "./animation/CanvasContainer.jsx"
import { useRef } from "react"
import { useScroll } from "framer-motion"


import HeroSection from "./subcomponent/hero-section.jsx"
import AboutSection from "./subcomponent//AboutSection.jsx"
import ProjectsSection from "./subcomponent/projects-section"
import TechStackSection from "./subcomponent/tech-stack-section"
import ContactSection from "./subcomponent/ContactSection.jsx"
import ScrollSplit from "./subcomponent/ScrollSplit.jsx"
import VantaTrunkBackground from "./subcomponent/VantaTrunkBackground.jsx"
import  firstLayer from "./subcomponent/firstLayer.jsx"



export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  return (
    <main className="bg-black">
      {/* <VantaTrunkBackground/> */}
      <ScrollSplit/>
      <firstLayer/>
       {/* <div>  <CanvasContainer /></div> */}
    
       {/* <div ref={containerRef} className="relative z-20">
              <HeroSection />
              <AboutSection />
              <ProjectsSection />
              <TechStackSection />
              <ContactSection />
            </div> */}
    </main>
  )
}
