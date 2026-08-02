import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './Navbar';
import { MobileMenu } from './MobileMenu';
import Footer from './Footer';
import ScrollProgress from '../ui/ScrollProgress';
import './PageLayout.css';

/**
 * ScrollToTop scrolls to the top of the page on every route change
 * (unless there's a hash, which HashScroller handles instead).
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

/**
 * HashScroller intercepts React Router hash changes and smooth scrolls via Lenis
 */
function HashScroller() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (location.hash && lenis) {
      // Small timeout ensures the DOM has finished painting the target page
      const timeout = setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          lenis.scrollTo(target, { offset: -100, duration: 1.2 });
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [location.hash, location.pathname, lenis]);

  return null;
}

/**
 * PageLayout - DESIGN.md v3
 * The primary layout wrapper wrapping all site routes.
 * Injects Navbar, generic main content area, and Footer.
 */
function PageLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ReactLenis root>
        <ScrollToTop />
        <HashScroller />
        <div className="page-layout">
          <Navbar mobileOpen={isMenuOpen} setMobileOpen={setIsMenuOpen} />
          <ScrollProgress />
          <main className="page-layout__main" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </ReactLenis>
      {/* MobileMenu sits outside Lenis so it never has touch events intercepted */}
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}

export default PageLayout;
