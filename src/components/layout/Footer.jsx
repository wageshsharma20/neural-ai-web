import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/mockData';
import './Footer.css';

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'none', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
      onAnimationComplete={(definition) => {
        // Clear filter after animation to prevent Chromium backdrop-filter bugs globally
        if (definition === 'visible') {
            // Because framer motion can overwrite this, we do it in rAF, but for the footer it's okay.
        }
      }}
    >
      {children}
    </motion.div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer-modern" role="contentinfo">
      {/* Top glowing blur line */}
      <div className="footer-blur-line" />

      <div className="footer-grid">
        {/* Brand Section */}
        <AnimatedContainer className="footer-brand-col">
          <Link to="/" className="footer__logo" aria-label="Neural AI Home">
            <img src="/logo.png" alt="Neural AI Logo" className="footer__logo-img" />
            <span className="footer__wordmark">Neural AI</span>
          </Link>
          <p className="footer__tagline mt-8 md:mt-0">
            The official AI Society of Delhi Technological University.
          </p>
          <p className="footer__copy mt-8">
            © {year} Neural AI, Delhi Technological University. All rights reserved.
          </p>
          <p className="footer__est">Est. 2019</p>
        </AnimatedContainer>

        {/* Pages */}
        <AnimatedContainer delay={0.2} className="footer-links-col">
          <h3 className="footer__nav-label">Pages</h3>
          <ul className="footer-link-list">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link to={l.href} className="footer-link-item" id={`footer-${l.id}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/portal" className="footer-link-item" id="footer-portal">
                Member Portal
              </Link>
            </li>
          </ul>
        </AnimatedContainer>

        {/* Contact */}
        <AnimatedContainer delay={0.3} className="footer-links-col">
          <h3 className="footer__nav-label">Contact</h3>
          <address className="footer__address footer-link-list">
            <p>Neural AI, DTU</p>
            <p>Shahbad Daulatpur, Delhi — 110042</p>
            <Link to="/contact" className="footer-link-item mt-4">
              Contact Us
            </Link>
          </address>
          {/* Social links */}
          <ul className="footer__socials" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id} className="footer__social-item">
                {s.href.startsWith('/') ? (
                  <Link
                    to={s.href}
                    id={s.id}
                    className="footer__social"
                    aria-label={s.label}
                  >
                    {s.iconClass ? <i className={s.iconClass}></i> : s.label}
                  </Link>
                ) : (
                  <a
                    href={s.href}
                    id={s.id}
                    className="footer__social"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Neural AI on ${s.label}`}
                  >
                    {s.iconClass ? <i className={s.iconClass}></i> : s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </AnimatedContainer>
      </div>
    </footer>
  );
}

export default Footer;
