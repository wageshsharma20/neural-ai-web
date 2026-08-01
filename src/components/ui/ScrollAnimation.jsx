'use client';

import { motion } from 'framer-motion';
import React, { useRef } from 'react';

const generateVariants = (direction) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 20 : -20;

  // We omit filter to avoid Chromium backdrop-filter bugs
  return {
    hidden: { opacity: 0, [axis]: value },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = {
  once: true,
  amount: 0.3,
  margin: '0px 0px -200px 0px',
};

export function ScrollAnimation({
  children,
  className,
  variants,
  viewport = defaultViewport,
  delay = 0,
  direction = 'down',
  as: Component = 'div',
  onAnimationComplete,
  ...props
}) {
  const ref = useRef(null);
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...baseVariants.visible.transition,
        delay,
      },
    },
  };

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      whileInView='visible'
      initial='hidden'
      variants={modifiedVariants}
      viewport={viewport}
      className={className}
      onAnimationComplete={(definition) => {
        // Chromium backdrop-filter bug fix: 
        // Wiping all inline styles after animation ensures no rogue 
        // translateZ(0), filter, or will-change properties break glassmorphism
        if (definition === 'visible' && ref.current) {
          requestAnimationFrame(() => {
            if (ref.current) {
              ref.current.style.cssText = '';
            }
          });
        }
        if (onAnimationComplete) {
          onAnimationComplete(definition);
        }
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
