import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './TeamSlider.css';

export default function TeamSlider({ members, scrollYProgress }) {
  const contentRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure the total scrollable width of the cards
  useEffect(() => {
    const measure = () => {
      if (contentRef.current && contentRef.current.parentElement) {
        const totalWidth = contentRef.current.scrollWidth;
        const startX = contentRef.current.parentElement.getBoundingClientRect().left;
        const visibleWidth = window.innerWidth - startX;
        
        // The distance we need to translate left is the total width minus the visible width available to it.
        // Since the content already has padding-right: 5vw, this mathematically aligns the right edge perfectly.
        setContainerWidth(Math.max(0, totalWidth - visibleWidth));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    
    // Slight delay to ensure images/fonts load before measuring
    const timeout = setTimeout(measure, 100);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timeout);
    };
  }, [members]);

  // Spring physics for ultra-smooth buttery scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.1
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -containerWidth]);

  return (
    <motion.div 
      style={{ x }} 
      className="team-hscroll__content" 
      ref={contentRef}
    >
      {members.map((member) => (
        <div key={member.id} className="team-card">
          <div className="team-card__image-container">
            {member.image ? (
              <img src={member.image} alt={member.name} className="team-card__image" loading="lazy" />
            ) : (
              <div className="team-card__fallback">{member.name.charAt(0)}</div>
            )}
          </div>
          <div className="team-card__info">
            <h3 className="team-card__name">{member.name}</h3>
            <p className="team-card__role">{member.role}</p>
            <p className="team-card__dept">{member.dept}</p>
            <a href={member.linkedin} className="team-card__linkedin" aria-label={`LinkedIn of ${member.name}`}>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
