import React from 'react';
import './AboutPreview.css';

function AboutPreview() {
  return (
    <section className="about section reveal" id="about" aria-labelledby="about-heading">
      <div className="container about__inner">
        <div className="about__label-col">
          <p className="eyebrow">About</p>
        </div>
        <div className="about__content">
          <h2 className="about__heading" id="about-heading">
            A formal society built on research, rigour, and community.
          </h2>
          <p className="about__body">
            Founded in 2019 at Delhi Technological University, Neural AI brings together students
            working across computer vision, NLP, reinforcement learning, generative AI, and
            robotics. We have a charter, elected officers, domain leads, and an archive of
            published work. We are not a coding club — we are a research society.
          </p>
          <a href="/society" className="about__link">
            Read our full story →
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
