import { useEffect } from 'react';

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to elements with the `.reveal` class
 * inside the given root ref (or document if no ref given).
 * Adds `.is-visible` when they enter the viewport.
 * Matches the "crisp fade + 8px rise" from the design system.
 */
export function useScrollReveal(rootRef = null) {
  useEffect(() => {
    const root = rootRef?.current ?? document;
    const targets = root.querySelectorAll('.reveal');

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootRef]);
}
