import React from 'react';
import './Button.css';

/**
 * Button
 *
 * Design system: "Rectangular, 4px radius, signal-cyan fill on ink /
 * graphite fill on bone, no glow, no gradient.
 * Hover = a 1px underline extends from the left, not a lightening/glow."
 *
 * @param {'primary'|'ghost'|'text'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {string} href  - renders as <a> when provided
 * @param {boolean} external - adds target="_blank" rel="noopener noreferrer"
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  id,
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        id={id}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      id={id}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
