import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/mockData';
import { ScrollAnimation } from '../../components/ui/ScrollAnimation';
import { LineAnimation } from '../../components/ui/LineAnimation';
import './Achievements.css';

function Achievements({ variant = 'default' }) {
  const [displayIndices, setDisplayIndices] = useState([0, 1]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        let i1 = Math.floor(Math.random() * ACHIEVEMENTS.length);
        let i2 = Math.floor(Math.random() * ACHIEVEMENTS.length);
        while (i1 === i2) {
          i2 = Math.floor(Math.random() * ACHIEVEMENTS.length);
        }
        setDisplayIndices([i1, i2]);
        setIsAnimating(false);
      }, 400); // Wait for fade out to complete before swapping
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Make sure we have valid data before rendering
  const displayItems = (displayIndices[0] !== undefined && ACHIEVEMENTS[displayIndices[0]])
    ? [ACHIEVEMENTS[displayIndices[0]], ACHIEVEMENTS[displayIndices[1]]]
    : [];

  const renderContent = () => (
    <>
      <div className={`ach__header ${variant === 'society' ? 'ach__header--society' : ''}`}>
        <div>
          <LineAnimation as="p" className="eyebrow" text="Achievements" direction="left" staggerDelay={0.1} />
          <LineAnimation 
            as="h2" 
            className="ach__heading" 
            id="ach-heading"
            text={variant === 'society' ? 'Stated factually.' : 'Recent achievements.'}
            direction="left"
            staggerDelay={0.1}
          />
        </div>
      </div>

      <div className="ach__slider">
        <ul className={`ach__grid ${isAnimating ? 'ach__grid--fading' : ''}`} role="list">
          {displayItems.map((a, idx) => (
            <li key={`${a?.id || idx}-${idx}`} className="ach__card" id={a?.id}>
              <div className="ach__card-image" style={{ backgroundImage: `url(${a?.image})` }}>
                <div className="ach__card-overlay"></div>
                <div className="ach__card-header">
                  <div className="ach__icon-wrapper">
                    <Trophy size={18} className="ach__icon" />
                  </div>
                  <span className="ach__card-year">{a?.year}</span>
                </div>
              </div>
              <div className="ach__card-content">
                <div className="ach__card-body-wrapper">
                  <h3 className="ach__card-title">{a?.title}</h3>
                  <p className="ach__card-body">{a?.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (variant === 'society') {
    return (
      <ScrollAnimation as="section" className="society-section ach-section" id="achievements" aria-labelledby="ach-heading">
        <div className="container">
          {renderContent()}
        </div>
      </ScrollAnimation>
    );
  }

  return (
    <ScrollAnimation as="section" className="ach section ach-section" id="achievements" aria-labelledby="ach-heading">
      <div className="container">
        {renderContent()}
      </div>
    </ScrollAnimation>
  );
}

export default Achievements;
