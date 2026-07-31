import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../data/mockData';
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
        <nav className="navbar__nav" aria-label="Primary navigation">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.href}
                  id={link.id}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `navbar__link${isActive ? ' navbar__link--active' : ''}`
                  }
                  aria-current={location.pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Member Login — bordered, understated */}
        <a href="/portal" className="navbar__login" id="navbar-login">
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
              <a href="/portal" className="navbar__mobile-link">Member Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
