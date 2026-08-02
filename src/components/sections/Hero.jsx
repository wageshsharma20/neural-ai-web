import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Dock, DockIcon } from '../ui/Dock';
import { KineticText } from '../ui/KineticText';
import { LineAnimation } from '../ui/LineAnimation';
import MRXBrain from '../ui/MRXBrain';
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
            <p className="hero__eyebrow fade-in fade-in--d1">DTU — AI Society</p>
            
            <h1 className="hero__heading fade-in fade-in--d2" id="hero-heading">
              <KineticText 
                text="Neural AI" 
                className="hero__heading-gradient" 
              />
            </h1>
            
            <LineAnimation 
              as="p" 
              className="hero__description" 
              text="Neural AI is the official AI Society of DTU — a community of students who build, research, and collaborate at the frontier of artificial intelligence."
              direction="left"
              staggerDelay={0.1}
            />
            
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
              <Dock direction="middle" iconSize={38} iconMagnification={56} iconDistance={80}>
                <DockIcon>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FontAwesomeIcon icon={faInstagram} style={{ width: '100%', height: '100%' }} />
                  </a>
                </DockIcon>
                <DockIcon>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} style={{ width: '100%', height: '100%' }} />
                  </a>
                </DockIcon>
                <DockIcon>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} style={{ width: '100%', height: '100%' }} />
                  </a>
                </DockIcon>
              </Dock>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side: Visual (Restored viewport-edge spanning) */}
      <div className="hero__visual fade-in fade-in--d5">
        <MRXBrain />
      </div>

      <div className="hero__rule" aria-hidden="true" />
    </section>
  );
}

export default Hero;
