import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Hero.css';

/**
 * Hero 
 * Left-aligned text, right image layout as requested by user.
 */
function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__inner fade-in">
          
          {/* Left Side: Content */}
          <div className="hero__content">
            <p className="hero__eyebrow fade-in fade-in--d1">
              DTU — AI Society
            </p>
            
            <h1 className="hero__heading fade-in fade-in--d2" id="hero-heading">
              <span className="hero__heading-gradient">Neural AI</span>
            </h1>
            
            <p className="hero__description fade-in fade-in--d3">
              Neural AI is the official AI Society of DTU — a community of students
              who build, research, and collaborate at the frontier of artificial intelligence.
            </p>
            
            <div className="hero__actions fade-in fade-in--d3">
              <a href="/society" className="hero__btn--colorful group" id="hero-cta-society">
                <div className="hero__btn-content">
                  <span>Explore the Society</span>
                  <ArrowUpRight className="hero__btn-icon-up" />
                </div>
              </a>
              
              {/* Button 1 from prompts: Slide-out icon */}
              <a href="/notices" className="hero__btn--slide group" id="hero-cta-notices">
                <span className="hero__btn-text">Notice Board</span>
                <i className="hero__btn-slider">
                  <ChevronRight className="hero__btn-icon-right" />
                </i>
              </a>
            </div>

            <div className="hero__socials fade-in fade-in--d4">
              <a href="https://instagram.com" className="hero__social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://linkedin.com" className="hero__social-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com" className="hero__social-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className="hero__rule" aria-hidden="true" />
    </section>
  );
}

export default Hero;
