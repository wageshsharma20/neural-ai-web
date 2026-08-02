import React from 'react';
import { ScrollAnimation } from './ScrollAnimation';

/**
 * Refactored LineAnimation:
 * The original implementation attempted to split text into lines by measuring DOM offsetTop.
 * This caused severe bugs where text scattered or broke incorrectly on mobile devices 
 * or before fonts fully loaded. 
 * We now wrap the text in a robust ScrollAnimation which handles the fade/slide safely 
 * while letting the browser's native CSS layout handle text wrapping perfectly.
 */
export function LineAnimation({ 
  text = '', 
  direction = 'up',
  className = '',
  as: Component = 'div',
  ...rest
}) {
  // If the text contains literal \n or newline characters, we split it to preserve intentional line breaks
  const lines = text.split(/\\n|\n/);

  return (
    <ScrollAnimation 
      as={Component}
      className={className} 
      direction={direction}
      {...rest}
    >
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </ScrollAnimation>
  );
}
