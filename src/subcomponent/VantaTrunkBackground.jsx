import { useEffect, useRef, useState } from "react";
import * as THREE from "three"; // Vanta needs THREE in global scope
import TRUNK from "vanta/src/vanta.trunk"; // or use CDN via script if not using bundler
import "p5"; // required dependency

const VantaTrunkBackground = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        TRUNK({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          chaos: 1,
          spacing: 0,
          color: 0xe6c5cf,
          backgroundColor: 0xfdfeff
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} style={{ width: "100%", height: "100vh", position: "absolute", top: 0, left: 0, zIndex: -1 }} />;
};

export default VantaTrunkBackground;
