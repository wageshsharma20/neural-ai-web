import React from 'react';
import { motion } from 'framer-motion';
import './KineticText.css';

export function KineticText({
  text,
  className = "",
  style,
  ...rest
}) {
  return (
    <span
      {...rest}
      className={`kinetic-text ${className}`}
      style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="kinetic-letter"
          style={{ display: 'inline-block', transformOrigin: 'bottom center', padding: '0 0.02em' }}
          whileHover={{
            scaleY: 1.3,
            scaleX: 1.1,
            y: -10,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
            mass: 0.8,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
