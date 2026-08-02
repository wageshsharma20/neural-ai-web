import { createPortal } from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/mockData';
import ScrollProgress from '../ui/ScrollProgress';
import { MobileMenu } from './MobileMenu';
import './Navbar.css';/**
 * Navbar — DESIGN.md v3
 * "Small Seal + wordmark left, flat text nav centered/right, one bordered Member Login far right."
 * No pill buttons, no glow, no icon decoration per link.
 * Nav links: hairline underline draws in on hover/active (150ms).
 */
function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeMenu, setActiveMenu] = useState(null);
  const location                    = useLocation();
  const navRef                      = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [mobileOpen]);

  return (
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      ref={navRef}
      role="banner"
    >
      <div className="navbar__inner container">

        {/* Logo: small Seal + wordmark */}
        <Link to="/" className="navbar__logo" id="navbar-logo" aria-label="Neural AI — Home">
          <img src="/logo.png" alt="Neural AI Logo" className="navbar__logo-img" />
          <span className="navbar__wordmark">
            Neural <span className="navbar__wordmark-ai">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="navbar__nav"
          aria-label="Primary navigation"
          onMouseLeave={() => {
            setCursorPosition((prev) => ({ ...prev, opacity: 0 }));
            setActiveMenu(null);
          }}
        >
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li
                key={link.id}
                onMouseEnter={(e) => {
                  setCursorPosition({
                    width: e.currentTarget.offsetWidth,
                    left: e.currentTarget.offsetLeft,
                    opacity: 1,
                  });
                  setActiveMenu(link.id);
                }}
              >
                <NavLink
                  to={link.href}
                  id={link.id}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
            <li
              className="navbar__cursor"
              style={{
                left: cursorPosition.left,
                width: cursorPosition.width,
                opacity: cursorPosition.opacity,
              }}
            />
          </ul>

          {/* ── Mega Menus ── */}
          <DropdownPanel isOpen={activeMenu === 'nav-society'}>
            <div className="navbar__mega-grid">
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">About Us</h3>
                <Link to="/society#vision" className="navbar__mega-link">Our Vision & Mission</Link>
                <Link to="/society#values" className="navbar__mega-link">Core Values</Link>
                <Link to="/society#timeline" className="navbar__mega-link">Legacy Timeline</Link>
              </div>
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">People</h3>
                <Link to="/society#team" className="navbar__mega-link">Executive Team</Link>
                <Link to="/society#hall-of-fame" className="navbar__mega-link">Hall of Fame</Link>
                <Link to="/society#faculty" className="navbar__mega-link">Faculty Advisor</Link>
              </div>
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">Join Us</h3>
                <Link to="/notices#recruitment" className="navbar__mega-link">Recruitment Process</Link>
                <Link to="/society#values" className="navbar__mega-link">Membership Perks</Link>
              </div>
            </div>
          </DropdownPanel>

          <DropdownPanel isOpen={activeMenu === 'nav-notices'}>
            <div className="navbar__mega-grid">
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">Updates</h3>
                <Link to="/notices#notice-board" className="navbar__mega-link">Latest Announcements</Link>
                <Link to="/notices#notice-board" className="navbar__mega-link">Important Notices</Link>
              </div>
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">Events</h3>
                <Link to="/notices#notice-board" className="navbar__mega-link">Upcoming Events</Link>
                <Link to="/notices#notice-board" className="navbar__mega-link">Hackathons</Link>
                <Link to="/notices#notice-board" className="navbar__mega-link">Workshops</Link>
              </div>
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">Milestones</h3>
                <Link to="/society#achievements" className="navbar__mega-link">Recent Achievements</Link>
                <Link to="/society#achievements" className="navbar__mega-link">Awards & Mentions</Link>
              </div>
            </div>
          </DropdownPanel>

          <DropdownPanel isOpen={activeMenu === 'nav-blogs'}>
            <div className="navbar__mega-grid">
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">Content</h3>
                <Link to="/blogs#all-blogs" className="navbar__mega-link">Latest Articles</Link>
                <Link to="/blogs#all-blogs" className="navbar__mega-link">Research Papers</Link>
                <Link to="/blogs#featured-blog" className="navbar__mega-link">Editor's Picks</Link>
              </div>
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">Learning</h3>
                <Link to="/blogs#resources" className="navbar__mega-link">ML Roadmaps</Link>
                <Link to="/blogs#resources" className="navbar__mega-link">Tutorials & Guides</Link>
                <Link to="/blogs#resources" className="navbar__mega-link">Recommended Courses</Link>
              </div>
              <div className="navbar__mega-section">
                <h3 className="navbar__mega-title">AI Domains</h3>
                <Link to="/blogs#all-blogs" className="navbar__mega-link">Machine Learning</Link>
                <Link to="/blogs#all-blogs" className="navbar__mega-link">Deep Learning</Link>
                <Link to="/blogs#all-blogs" className="navbar__mega-link">Generative AI</Link>
                <Link to="/blogs#all-blogs" className="navbar__mega-link">Agentic Systems</Link>
              </div>
            </div>
          </DropdownPanel>
        </nav>

        {/* Member Login — bordered, understated */}
        <a href="/login" className="navbar__login" id="navbar-login">
          Member Login
        </a>

        {/* Mobile toggle button */}
        <button
          className={`nav-close-btn${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          id="navbar-hamburger"
        >
          <div className="menu-button-text">
            <p className="p-large" style={{ transform: mobileOpen ? 'translateY(-100%)' : 'translateY(0)' }}>Menu</p>
            <p className="p-large" style={{ transform: mobileOpen ? 'translateY(-100%)' : 'translateY(0)' }}>Close</p>
          </div>
          <div className="icon-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="menu-button-icon"
              style={{ transform: mobileOpen ? 'rotate(315deg)' : 'rotate(0deg)', transition: 'transform 0.4s ease' }}
            >
              <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor"></path>
              <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
              <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor"></path>
              <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor"></path>
              <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor"></path>
              <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor"></path>
            </svg>
          </div>
        </button>
      </div>

      {typeof document !== 'undefined' ? createPortal(<MobileMenu isMenuOpen={mobileOpen} setIsMenuOpen={setMobileOpen} />, document.body) : null}
    </header>
  );
}

/**
 * DropdownPanel handles the delayed unmount so CSS transitions can finish
 * before the element is removed from the DOM.
 */
function DropdownPanel({ isOpen, children }) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`navbar__mega-menu${isOpen ? ' navbar__mega-menu--open' : ''}`}
      onMouseEnter={(e) => e.stopPropagation()} 
    >
      <div className="navbar__mega-menu-inner">
        {children}
      </div>
    </div>
  );
}

export default Navbar;
