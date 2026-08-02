import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'motion/react';

const containerVariants = {
  textHidden: {},
  textVisible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const generateVariants = (direction) => {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const value = direction === 'right' || direction === 'down' ? 100 : -100;
  return {
    textHidden: {
      filter: 'blur(10px)',
      opacity: 0,
      [axis]: value,
    },
    textVisible: {
      filter: 'blur(0px)',
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };
};

const defaultViewport = { amount: 0.3, margin: '0px 0px 0px 0px', once: true };

const TextAnimation = ({
  as = 'h1',
  text,
  classname = '',
  viewport = defaultViewport,
  variants,
  direction = 'down',
  letterAnime = false,
  lineAnime = false,
  ...props
}) => {
  const baseVariants = variants || generateVariants(direction);
  const modifiedVariants = {
    textHidden: baseVariants.textHidden,
    textVisible: {
      ...baseVariants.textVisible,
    },
  };
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      whileInView="textVisible"
      initial="textHidden"
      variants={containerVariants}
      viewport={viewport}
      className={cn(classname)}
      {...props}
    >
      {lineAnime ? (
        <motion.span style={{ display: 'inline-block' }} variants={modifiedVariants}>
          {text}
        </motion.span>
      ) : (
        <>
          {text.split(' ').map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              style={{ display: 'inline-block' }}
              variants={letterAnime === false ? modifiedVariants : {}}
            >
              {letterAnime ? (
                <>
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      style={{ display: 'inline-block' }}
                      variants={modifiedVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  &nbsp;
                </>
              ) : (
                <>{word}&nbsp;</>
              )}
            </motion.span>
          ))}
        </>
      )}
    </MotionComponent>
  );
};

export default TextAnimation;
