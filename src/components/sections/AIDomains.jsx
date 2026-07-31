import React, { useState } from 'react';
import { AI_DOMAINS } from '../../data/mockData';
import './AIDomains.css';

function AIDomains() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="domains section reveal" id="domains" aria-labelledby="domains-heading">
      <div className="container">

        <div className="domains__header">
          <p className="eyebrow">Society Domains</p>
          <h2 className="domains__heading" id="domains-heading">
            Six active research clusters.
          </h2>
        </div>

        <ul className="domains__grid" role="list">
          {AI_DOMAINS.map((d, i) => (
            <li
              key={d.id}
              className="domains__item"
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Invisible placeholder to maintain grid cell height */}
              <div className="domains__card-placeholder" aria-hidden="true">
                <div className="domains__card-top">
                  <span className="domains__num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="domains__name">{d.label}</p>
                  <p className="domains__desc">{d.description}</p>
                </div>
              </div>

              {/* Absolutely positioned card that expands out of flow */}
              <div
                className={`domains__card ${hovered === d.id ? 'domains__card--expanded' : ''}`}
                id={d.id}
              >
                {/* Always-visible top section */}
                <div className="domains__card-top">
                  <span className="domains__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="domains__name">{d.label}</p>
                  <p className="domains__desc">{d.description}</p>
                </div>

                {/* Expanded details — slides down out of flow */}
                <div className="domains__card-expand" aria-hidden={hovered !== d.id}>
                  <p className="domains__subhead">Subdomains</p>
                  <ul className="domains__subdomains">
                    {d.subdomains.map(sub => (
                      <li key={sub} className="domains__subdomain-item">{sub}</li>
                    ))}
                  </ul>
                </div>

                {/* Decorative corner accent */}
                <span className="domains__corner" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

export default AIDomains;
