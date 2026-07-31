import { useEffect, useState } from 'react';

/**
 * useActiveSection
 *
 * Tracks which section is currently in view using IntersectionObserver.
 * Used by the Navbar to highlight the active route visually.
 */
export function useActiveSection(sectionIds = []) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
