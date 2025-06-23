import { cloneElement, type CSSProperties, type JSX } from 'react';

interface ImageButtonProps {
  /** Image to display within the button. */
  image: JSX.Element;
  /** Accessibility-friendly label for the button describing its function */
  label: string;
  /** The button's function, will be activated on click or keypress */
  onClick: () => void;
  // Optional props
  /** Button height. */
  height?: CSSProperties['height'];
  /** Button padding. */
  padding?: CSSProperties['padding'];
  /** Other CSS style attributes for the button. */
  buttonStyle?: CSSProperties;
  /** Other CSS style attributes for the SVG. */
  imageStyle?: CSSProperties;
}

/**
 * Image button component
 *
 * Button whose inner content is just an image. This component reduces repeated code to ensure it passes accessibility
 * standards (48px minimum dimensions).
 *
 * It accepts an SVG imported as a React component. Enabling this would sometimes break the Storybook preview, so I
 * disabled it in the table below.
 */
export default function ImageButton({
  image,
  label,
  onClick,
  height = '32px',
  padding = 'var(--padding)',
  buttonStyle,
  imageStyle,
}: ImageButtonProps) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      type="button"
      style={{
        cursor: 'pointer',
        padding,
        ...buttonStyle,
      }}
    >
      {cloneElement(image, { style: { height, ...imageStyle }, 'aria-hidden': true })}
    </button>
  );
}
