import { cloneElement, type CSSProperties, type JSX } from 'react';
import { Link } from 'react-router';
import { Errors } from '../constants';

interface ImageButtonProps {
  /** Image to display within the button. */
  image: JSX.Element;
  /** Accessibility-friendly label for the button describing its function */
  label: string;
  /** The button's function, will be activated on click or keypress. At least one of `onClick` or `link` must be provided. */
  onClick?: () => void;
  /** A link to navigate to when the button is clicked. Makes the button act as a hyperlink instead. At least one of `onClick` or `link` must be provided. */
  link?: string;
  // Optional props
  /** Whether to open the link in a new tab. Only applies if `link` is provided. Default: false */
  linkNewTab?: boolean;
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
  link,
  linkNewTab = false,
  height = '32px',
  padding = 'var(--padding)',
  buttonStyle,
  imageStyle,
}: ImageButtonProps) {
  if (onClick === undefined && link === undefined) {
    throw new Error(Errors.ImageButtonMissingProps);
  }

  const imageJsx = cloneElement(image, { style: { height, ...imageStyle }, 'aria-hidden': true });

  if (onClick) {
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
        {imageJsx}
      </button>
    );
  }

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      to={link!}
      target={linkNewTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        cursor: 'pointer',
        padding,
        color: 'inherit',
        textDecoration: 'none',
        ...buttonStyle,
      }}
    >
      {imageJsx}
    </Link>
  );
}
