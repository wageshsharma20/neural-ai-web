import React from 'react';
import { ACHIEVEMENTS } from '../../data/mockData';
import './Achievements.css';

function Achievements() {
  return (
    <section className="ach section reveal" id="achievements" aria-labelledby="ach-heading">
      <div className="container">
        <div className="ach__header">
          <p className="eyebrow">Recognition</p>
          <h2 className="ach__heading" id="ach-heading">Recent achievements.</h2>
        </div>
        <ul className="ach__list" role="list">
          {ACHIEVEMENTS.map((a) => (
            <li key={a.id} className="ach__item" id={a.id}>
              {/* Small stamped seal mark */}
              <svg className="ach__stamp" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="7.5" stroke="var(--signal-violet)" strokeWidth="0.7" opacity="0.6" />
                <circle cx="9" cy="9" r="1.5" fill="var(--signal-violet)" opacity="0.8" />
                <line x1="9" y1="3" x2="9" y2="15" stroke="var(--signal-violet)" strokeWidth="0.5" opacity="0.5" />
                <line x1="9" y1="6.5" x2="6" y2="4.5" stroke="var(--signal-violet)" strokeWidth="0.4" opacity="0.4" />
                <line x1="9" y1="6.5" x2="12" y2="4.5" stroke="var(--signal-violet)" strokeWidth="0.4" opacity="0.4" />
              </svg>
              <div className="ach__item-content">
                <p className="ach__item-title">{a.title}</p>
                <p className="ach__item-body">{a.body}</p>
              </div>
              <span className="ach__item-year">{a.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Achievements;
