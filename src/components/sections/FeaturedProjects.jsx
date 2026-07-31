import React from 'react';
import { FEATURED_PROJECTS } from '../../data/mockData';
import './FeaturedProjects.css';

function FeaturedProjects() {
  return (
    <section className="projects section reveal" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="projects__header">
          <div>
            <p className="eyebrow">Research &amp; Projects</p>
            <h2 className="projects__heading" id="projects-heading">
              Research that ships.
            </h2>
          </div>
          <a href="/blogs#projects" className="projects__all">View all →</a>
        </div>

        <ul className="projects__list" role="list">
          {FEATURED_PROJECTS.map((p) => (
            <li key={p.id} className="project-row" id={p.id}>
              <div className="project-row__meta">
                <span className="project-row__domain">{p.domain}</span>
                <span className="project-row__year">{p.year}</span>
              </div>
              <div className="project-row__main">
                <h3 className="project-row__title">{p.title}</h3>
                <p className="project-row__tagline">{p.tagline}</p>
              </div>
              <div className="project-row__links">
                {p.github && (
                  <a href={p.github} className="project-row__link" target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} className="project-row__link project-row__link--accent" target="_blank" rel="noopener noreferrer">
                    Demo ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FeaturedProjects;
