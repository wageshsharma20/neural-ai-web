import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './PageLayout.css';

/**
 * PageLayout
 *
 * Shared shell that wraps every public page with Navbar + Footer.
 * Applies top padding to account for the fixed Navbar.
 * Triggers scroll reveal on all .reveal children.
 */
function PageLayout({ children }) {
  useScrollReveal();

  return (
    <div className="page-layout">
      <Navbar />
      <main className="page-layout__main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PageLayout;
