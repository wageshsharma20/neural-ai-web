import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';

const generateVariants = (direction) => {
  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;

  return {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      [axis === 'X' ? 'x' : 'y']: value,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis === 'X' ? 'x' : 'y']: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };
};

export function LineAnimation({ 
  text = '', 
  direction = 'left',
  className = '',
  as: Component = 'div',
  staggerDelay = 0.1,
  ...rest
}) {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isGradient, setIsGradient] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const computedStyle = window.getComputedStyle(containerRef.current);
    if (computedStyle.WebkitBackgroundClip === 'text' || computedStyle.backgroundClip === 'text') {
      setIsGradient(true);
    }

    const computeLines = () => {
      // Clone the container to avoid mutating React's managed DOM
      const clone = containerRef.current.cloneNode(false);
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.width = '100%';
      clone.style.height = 'auto';
      
      const words = text.split(/(\s+)/);
      clone.innerHTML = words.map(w => {
        if (w.includes('\n') || w.includes('\\n')) {
          const parts = w.split(/\\n|\n/);
          return parts.map(p => p.trim() ? `<span style="display:inline-block;">${p}</span>` : '').join('<br/>');
        }
        if (!w.trim()) return w;
        return `<span style="display:inline-block;">${w}</span>`;
      }).join('');
      
      containerRef.current.appendChild(clone);
      
      const spans = Array.from(clone.children);
      let currentLine = [];
      let currentTop = -1;
      const computedLines = [];
      
      spans.forEach(span => {
        if (span.tagName === 'BR') return;
        const top = span.offsetTop;
        if (currentTop === -1 || Math.abs(top - currentTop) > 5) {
          if (currentLine.length > 0) computedLines.push(currentLine.join(' '));
          currentLine = [span.textContent.trim()];
          currentTop = top;
        } else {
          currentLine.push(span.textContent.trim());
        }
      });
      if (currentLine.length > 0) computedLines.push(currentLine.join(' '));
      
      containerRef.current.removeChild(clone);
      
      setLines(computedLines);
      setIsReady(true);
    };

    computeLines();
    
    // Recompute on resize
    window.addEventListener('resize', computeLines);
    return () => window.removeEventListener('resize', computeLines);
  }, [text]);

  const variants = generateVariants(direction);

  return (
    <Component ref={containerRef} className={className} {...rest}>
      {!isReady && <span style={{ opacity: 0 }}>{text}</span>}
      {isReady && (
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: staggerDelay },
            },
          }}
          style={{ 
            display: 'block',
            ...(isGradient ? {
              backgroundImage: 'inherit',
              backgroundSize: 'inherit',
              backgroundPosition: 'inherit',
              backgroundRepeat: 'inherit',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            } : {})
          }}
        >
          {lines.map((line, i) => (
            <motion.span 
              key={i} 
              variants={variants}
              style={{ 
                display: 'block',
                ...(isGradient ? {
                  backgroundImage: 'inherit',
                  backgroundSize: 'inherit',
                  backgroundPosition: 'inherit',
                  backgroundRepeat: 'inherit',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                } : {})
              }}
            >
              {line}
            </motion.span>
          ))}
        </motion.span>
      )}
    </Component>
  );
}
