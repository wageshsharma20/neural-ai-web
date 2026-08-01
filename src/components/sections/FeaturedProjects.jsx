import { ScrollAnimation } from '../../components/ui/ScrollAnimation';
import { LineAnimation } from '../../components/ui/LineAnimation';
import React from 'react';
import { FEATURED_PROJECTS } from '../../data/mockData';
import './FeaturedProjects.css';

function FeaturedProjects() {
  return (
    <ScrollAnimation as="section" className="projects section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="projects__header">
          <div>
            <LineAnimation as="p" className="eyebrow" text="Research & Projects" direction="left" staggerDelay={0.1} />
            <LineAnimation 
              as="h2" 
              className="projects__heading" 
              id="projects-heading"
              text="Research that ships."
              direction="left"
              staggerDelay={0.1}
            />
          </div>
          <LineAnimation as="a" href="/blogs#projects" className="projects__all" text="View all →" direction="left" staggerDelay={0.1} />
        </div>

        <ul className="projects__list" role="list">
          {FEATURED_PROJECTS.map((p) => (
            <li key={p.id} className="project-row" id={p.id}>
              <div className="project-row__meta">
                <LineAnimation as="span" className="project-row__domain" text={p.domain} direction="left" staggerDelay={0.1} />
                <LineAnimation as="span" className="project-row__year" text={p.year} direction="left" staggerDelay={0.1} />
              </div>
              <div className="project-row__main">
                <LineAnimation as="h3" className="project-row__title" text={p.title} direction="left" staggerDelay={0.1} />
                <LineAnimation as="p" className="project-row__tagline" text={p.tagline} direction="left" staggerDelay={0.1} />
              </div>
              <div className="project-row__links">
                {p.github && (
                  <LineAnimation as="a" href={p.github} className="project-row__link" target="_blank" rel="noopener noreferrer" text="GitHub ↗" direction="left" staggerDelay={0.1} />
                )}
                {p.demo && (
                  <LineAnimation as="a" href={p.demo} className="project-row__link project-row__link--accent" target="_blank" rel="noopener noreferrer" text="Demo ↗" direction="left" staggerDelay={0.1} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollAnimation>
  );
}

export default FeaturedProjects;
