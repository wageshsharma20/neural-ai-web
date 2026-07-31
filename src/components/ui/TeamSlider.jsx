import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './TeamSlider.css';

export default function TeamSlider({ members }) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(members.length / itemsPerPage);

  useEffect(() => {
    // Reset page if totalPages changes and page is out of bounds
    if (page >= totalPages) {
      setPage(0);
    }
  }, [totalPages, page]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(prev => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const visibleMembers = members.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="team-slider">
      <div className="team-slider__grid">
        {visibleMembers.map((m) => (
          <div key={m.id} className="team-card slide-up">
            <div className="team-card__image-container">
              {m.image ? (
                <img src={m.image} alt={m.name} className="team-card__image" />
              ) : (
                <div className="team-card__fallback">{m.name.charAt(0)}</div>
              )}
            </div>
            <div className="team-card__content">
              <h3 className="team-card__name">{m.name}</h3>
              <p className="team-card__role">{m.role}</p>
              <p className="team-card__dept">{m.dept}</p>
              {m.linkedin && (
                <a href={m.linkedin} className="team-card__linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="team-slider__dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button 
              key={idx} 
              className={`team-slider__dot ${idx === page ? 'active' : ''}`}
              onClick={() => setPage(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
