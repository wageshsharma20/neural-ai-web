import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Spring physics smooths out any minor native scroll jitters
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ 
        position: 'fixed',
        top: 'var(--navbar-height)', // below navbar
        left: 0,
        right: 0, // Stretch full width
        height: '3px',
        background: 'linear-gradient(to right, var(--signal-cyan), var(--signal-violet), var(--signal-magenta))',
        transformOrigin: '0%', // Scale from the left
        scaleX, // Bind spring to scaleX
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ScrollProgress;
