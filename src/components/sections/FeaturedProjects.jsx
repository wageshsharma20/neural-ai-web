import { ScrollAnimation } from '../../components/ui/ScrollAnimation';
import { LineAnimation } from '../../components/ui/LineAnimation';
import React from 'react';
import { FEATURED_PROJECTS } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
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

        <ul className="projects__grid" role="list">
          {FEATURED_PROJECTS.map((p) => (
            <li key={p.id} className="project-card" id={p.id}>
              <div className="project-card__content">
                <div className="project-card__meta">
                  <span className="project-card__domain">{p.domain}</span>
                  <span className="project-card__year">{p.year}</span>
                </div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__tagline">{p.tagline}</p>
              </div>
              <div className="project-card__footer">
                <a href={p.github || p.demo || "#"} className="project-card__btn">
                  Read more <ArrowRight size={14} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </ScrollAnimation>
  );
}

export default FeaturedProjects;
