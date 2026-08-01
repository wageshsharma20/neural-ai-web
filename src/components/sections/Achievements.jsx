import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { ACHIEVEMENTS } from '../../data/mockData';
import './Achievements.css';

function Achievements() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.ach__card');
    cards.forEach(card => card.style.opacity = '0');

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cards.forEach((card, index) => {
            // Box 1 (index 1) is on the right, all others (0, 2, 3) are on the left side
            const fromLeft = index !== 1;
            
            animate(card, {
              x: [fromLeft ? '-20vw' : '20vw', 0],
              opacity: [0, 1],
              duration: 2500, // Slower duration
              delay: index * 300, // slightly more stagger
              ease: 'outQuad'
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="ach section" id="achievements" aria-labelledby="ach-heading" ref={sectionRef}>
      <div className="container">
        <div className="ach__header">
          <h2 className="ach__heading" id="ach-heading">Recent achievements.</h2>
        </div>
        <div className="ach__grid" role="list">
          {ACHIEVEMENTS.map((a, i) => (
            <div key={a.id} className={`ach__card ${i === 0 ? 'featured' : ''}`} id={a.id}>
              <div className="ach__card-content">
                <div className="ach__card-header">
                  <svg className="ach__stamp" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="7.5" stroke="var(--signal-violet)" strokeWidth="0.7" opacity="0.6" />
                    <circle cx="9" cy="9" r="1.5" fill="var(--signal-violet)" opacity="0.8" />
                    <line x1="9" y1="3" x2="9" y2="15" stroke="var(--signal-violet)" strokeWidth="0.5" opacity="0.5" />
                    <line x1="9" y1="6.5" x2="6" y2="4.5" stroke="var(--signal-violet)" strokeWidth="0.4" opacity="0.4" />
                    <line x1="9" y1="6.5" x2="12" y2="4.5" stroke="var(--signal-violet)" strokeWidth="0.4" opacity="0.4" />
                  </svg>
                  <span className="ach__card-year">{a.year}</span>
                </div>
                <div className="ach__card-body-wrapper">
                  <h3 className="ach__card-title">{a.title}</h3>
                  <p className="ach__card-body">{a.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
