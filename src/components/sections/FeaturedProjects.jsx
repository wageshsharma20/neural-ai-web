import { ScrollAnimation } from '../../components/ui/ScrollAnimation';
import TextAnimation from '../../components/ui/TextAnimation';
import React from 'react';
import { FEATURED_PROJECTS } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import './FeaturedProjects.css';

const cardVariants = {
  hidden: { opacity: 0, x: -100, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1, 
    x: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: i * 0.1
    }
  })
};

function FeaturedProjects() {
  return (
    <ScrollAnimation as="section" className="projects section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <div className="projects__header">
          <div>
            <TextAnimation as="p" classname="eyebrow" text="Research & Projects" direction="left" />
            <TextAnimation 
              as="h2" 
              classname="projects__heading" 
              id="projects-heading"
              text="Research that ships."
              direction="left"
            />
          </div>
          <TextAnimation as="a" href="/blogs#projects" classname="projects__all" text="View all →" direction="left" />
        </div>

        <ul className="projects__grid" role="list">
          {FEATURED_PROJECTS.map((p, index) => (
            <motion.li 
              key={p.id} 
              className="project-card" 
              id={p.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              variants={cardVariants}
            >
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
            </motion.li>
          ))}
        </ul>
      </div>
    </ScrollAnimation>
  );
}

export default FeaturedProjects;
