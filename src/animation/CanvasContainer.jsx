import React, { useState } from 'react';
import CyberCanvas from './CyberCanvas';
import LoadingSpinner from './LoadingSpinner';
import StartButton from './StartButton';
import SplitText from './ScrollTextWithCanvas'
import Inroduction from './Inroduction'

const CanvasContainer = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const handleStartClick = () => {
    console.log("Starting animation...");
    setIsAnimating(true);
  };
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-blue-150">
 
      
      <div className="absolute inset-0 z-[100%]">
     

        <CyberCanvas 
          isAnimating={isAnimating} 
          setIsLoading={setIsLoading}
          setLoadError={setLoadError}
        />
      </div>
    
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      
      {!isLoading && !isAnimating && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <StartButton onClick={handleStartClick} />
        </div>
      )}
      
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Error Loading Images</h2>
            <p>Could not load the animation images. Please check the file paths.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasContainer;