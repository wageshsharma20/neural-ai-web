import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/mockData';
import ScrollProgress from '../ui/ScrollProgress';
import './Navbar.css';

/**
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

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          id="navbar-hamburger"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a href="/login" className="navbar__mobile-link">Member Login</a>
            </li>
          </ul>
        </nav>
      </div>
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
