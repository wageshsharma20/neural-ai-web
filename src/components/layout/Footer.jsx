import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS } from '../../data/mockData';
import './Footer.css';

/**
 * Footer — DESIGN.md v3
 * "Small bordered link-buttons for socials, Plex Mono, 4px radius,
 *  mist border that turns signal-violet on hover."
 */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner container">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo" aria-label="Neural AI Home">
            <img src="/logo.png" alt="Neural AI Logo" className="footer__logo-img" />
            <span className="footer__wordmark">Neural AI</span>
          </Link>
          <p className="footer__tagline">
            The official AI Society of Delhi Technological University.
          </p>
        </div>

        {/* Nav */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <p className="footer__nav-label">Pages</p>
          <ul role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link to={l.href} className="footer__nav-link" id={`footer-${l.id}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/portal" className="footer__nav-link" id="footer-portal">
                Member Portal
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="footer__contact">
          <p className="footer__nav-label">Contact</p>
          <address className="footer__address">
            <p>Neural AI, DTU</p>
            <p>Shahbad Daulatpur, Delhi — 110042</p>
            <Link to="/contact" className="footer__email">
              Contact Us
            </Link>
          </address>
          {/* Social links — small bordered buttons per design spec */}
          <ul className="footer__socials" role="list" aria-label="Social links">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.id}>
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
        </div>

      </div>

      <div className="footer__bottom container">
        <span className="footer__copy">
          © {year} Neural AI, Delhi Technological University
        </span>
        <span className="footer__est">Est. 2019</span>
      </div>
    </footer>
  );
}

export default Footer;
