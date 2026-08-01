import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Eagerly load the Home page for best LCP
import HomePage from './pages/HomePage';

// Lazy-load remaining pages — reduce initial bundle
const SocietyPage    = lazy(() => import('./pages/SocietyPage'));
const NoticeBoardPage = lazy(() => import('./pages/NoticeBoardPage'));
const BlogsPage      = lazy(() => import('./pages/BlogsPage'));
const BlogPostPage   = lazy(() => import('./pages/BlogPostPage'));
const PortalPage     = lazy(() => import('./pages/PortalPage'));
const ContactPage    = lazy(() => import('./pages/ContactPage'));
const LoginPage      = lazy(() => import('./pages/LoginPage'));
const TwoFAPage      = lazy(() => import('./pages/TwoFAPage'));
// Minimal loading fallback — matches ink background to avoid flash
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="status"
      aria-label="Loading page"
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: 'var(--mist)',
        }}
      >
        Loading…
      </span>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/society" element={<SocietyPage />} />
          <Route path="/notices" element={<NoticeBoardPage />} />
          <Route path="/blogs"   element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPostPage />} />
          <Route path="/portal"  element={<PortalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login"   element={<LoginPage />} />
          <Route path="/2fa"     element={<TwoFAPage />} />
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: '100dvh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: '0 var(--space-8)',
                  maxWidth: 'var(--max-width)',
                  margin: '0 auto',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--mist)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  404
                </p>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '400',
                    letterSpacing: '-0.03em',
                    color: 'var(--bone)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  Page not found.
                </h1>
                <a
                  href="/"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--signal-cyan)',
                    letterSpacing: 'var(--tracking-wide)',
                    textTransform: 'uppercase',
                  }}
                >
                  ← Return home
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
