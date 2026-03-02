import { cloneElement, Fragment, type CSSProperties, type JSX } from 'react';
import { Errors } from '../constants';

interface LogoCarouselProps {
  /** Array of logos/images to display in the carousel. */
  logos: JSX.Element[];
  /** Number of rows in the carousel (default: 2). */
  rows?: number;
  /** Duration of the scrolling animation (default: '20s'). */
  animationDuration?: CSSProperties['animationDuration'];
  /** Other CSS style attributes for the carousel container. */
  containerStyle?: CSSProperties;
}

/**
 * Logo grid carousel component
 *
 * A grid of rows where each row scrolls horizontally, with adjacent rows
 * alternating between scrolling left and right.
 */
export default function LogoCarousel({
  logos,
  rows = 2,
  animationDuration = '20s',
  containerStyle,
}: LogoCarouselProps) {
  if (logos.length === 0) {
    throw new Error(Errors.LogoCarouselNoLogos);
  }
  if (!Number.isInteger(rows) || rows < 1) {
    throw new Error(Errors.LogoCarouselInvalidRows);
  }

  const logosPerRow = Math.ceil(logos.length / rows);
  const filledRows = Array.from({ length: rows }, (_, i) => logos.slice(i * logosPerRow, (i + 1) * logosPerRow));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const edgeFades = 'linear-gradient(90deg, transparent, var(--color-text) 20%, var(--color-text) 80%, transparent)';

  return (
    <div
      aria-label="Tech stack logos carousel"
      style={{
        ...(prefersReducedMotion
          ? {}
          : {
              overflow: 'hidden',
              mask: edgeFades,
              WebkitMask: edgeFades,
            }),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '600px',
        ...containerStyle,
      }}
    >
      {filledRows.map((rowLogos, rowIndex) => {
        return (
          <div
            key={rowIndex}
            style={{
              ...(prefersReducedMotion
                ? {
                    flexWrap: 'wrap',
                  }
                : {
                    width: 'max-content',
                    flexWrap: 'nowrap',
                    animation: `scroll ${animationDuration} linear infinite ${rowIndex % 2 === 0 ? 'normal' : 'reverse'}`,
                  }),
              margin: 0,
              display: 'flex',
              gap: 'var(--padding)',
              paddingBlockEnd: rowIndex < rows - 1 ? 'var(--padding)' : undefined,
            }}
          >
            {/* create the infinite loop but don't break accessibility by hiding the duplicates */}
            {[...rowLogos, ...rowLogos.map((item) => cloneElement(item, { 'aria-hidden': true }))].map(
              (logo, index) => (
                <Fragment key={index}>{logo}</Fragment>
              ),
            )}
          </div>
        );
      })}
    </div>
  );
}
