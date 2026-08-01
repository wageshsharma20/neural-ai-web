import { ScrollAnimation } from '../../components/ui/ScrollAnimation';
import React from 'react';
import { SOCIETY_STATS } from '../../data/mockData';
import './StatsSection.css';

function StatsSection() {
  return (
    <ScrollAnimation as="section" className="stats-section" id="stats" aria-labelledby="stats-heading">
      <div className="container">
        <div className="stats-section__inner">
          <div className="stats-section__left">
            <p className="eyebrow">By the Numbers</p>
            <h2 className="stats-section__heading" id="stats-heading">
              Six Years of<br />Building Together.
            </h2>
          </div>
          <dl className="stats-section__grid">
            {SOCIETY_STATS.map((s) => (
              <div className="stats-section__item" key={s.id} id={`stats-${s.id}`}>
                <dd className="stats-section__value">{s.value}</dd>
                <dt className="stats-section__label">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default StatsSection;
