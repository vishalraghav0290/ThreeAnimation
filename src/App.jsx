import { useRef } from "react";
import { useScroll } from "framer-motion";
import CanvasContainer from "./animation/CanvasContainer.jsx";
import ScrollSplit from "./subcomponent/ScrollSplit.jsx";

// Commented out components - can be added back when needed
// import HeroSection from "./subcomponent/hero-section.jsx";
// import AboutSection from "./subcomponent/AboutSection.jsx";
// import ProjectsSection from "./subcomponent/projects-section";
// import TechStackSection from "./subcomponent/tech-stack-section";
// import ContactSection from "./subcomponent/ContactSection.jsx";
// import VantaTrunkBackground from "./subcomponent/VantaTrunkBackground.jsx";
// import FirstLayer from "./subcomponent/FirstLayer.jsx";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-black h-screen w-full overflow-hidden">
      {/* Main scroll-based animation component */}
      <ScrollSplit canvasComponent={<CanvasContainer />} />
      
      {/* Commented out for now to focus on ScrollSplit functionality
      <div ref={containerRef} className="relative z-20">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
      </div> 
      */}
    </main>
  );
}