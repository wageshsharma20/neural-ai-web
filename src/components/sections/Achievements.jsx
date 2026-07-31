import React from 'react';
import { ACHIEVEMENTS } from '../../data/mockData';
import './Achievements.css';

function Achievements() {
  return (
    <section className="ach section reveal" id="achievements" aria-labelledby="ach-heading">
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
