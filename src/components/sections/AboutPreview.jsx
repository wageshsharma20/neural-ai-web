import { ScrollAnimation } from '../../components/ui/ScrollAnimation';
import { LineAnimation } from '../../components/ui/LineAnimation';
import React from 'react';
import './AboutPreview.css';

function AboutPreview() {
  return (
    <ScrollAnimation as="section" className="about section" id="about" aria-labelledby="about-heading">
      <div className="container about__inner">
        <div className="about__label-col">
          <p className="eyebrow">About</p>
        </div>
        <div className="about__content">
          <LineAnimation 
            as="h2" 
            className="about__heading" 
            id="about-heading"
            text="A formal society built on research, rigour, and community."
            direction="left"
            staggerDelay={0.1}
          />
          <LineAnimation 
            as="p" 
            className="about__body" 
            text="Founded in 2019 at Delhi Technological University, Neural AI brings together students working across computer vision, NLP, reinforcement learning, generative AI, and robotics. We have a charter, elected officers, domain leads, and an archive of published work. We are not a coding club — we are a research society."
            direction="left"
            staggerDelay={0.1}
          />
          <a href="/society" className="about__link">
            Read our full story →
          </a>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default AboutPreview;
