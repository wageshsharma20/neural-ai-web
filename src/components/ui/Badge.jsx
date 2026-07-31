import React from 'react';
import './Badge.css';

/**
 * Badge
 *
 * Design system: "Small rectangular labels in Plex Mono, uppercase,
 * letter-spaced, outlined in hairline rule — not filled pills."
 *
 * @param {'default'|'cyan'|'magenta'|'amber'} variant
 */
function Badge({ children, variant = 'default', className = '', id }) {
  return (
    <span
      className={['badge', `badge--${variant}`, className].filter(Boolean).join(' ')}
      id={id}
    >
      {children}
    </span>
  );
}

export default Badge;
