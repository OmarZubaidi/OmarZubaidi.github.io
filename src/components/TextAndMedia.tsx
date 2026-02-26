import { type CSSProperties, type JSX } from 'react';

interface TextAndMediaProps {
  /** Whether the image is on the left or right of the text. On small screens, the image will always be above the text. */
  imageSide: 'left' | 'right';
  /** Absolute image path to display within the button. */
  image: string;
  /** Accessibility-friendly alternative text for the image describing what it is */
  altText: string;
  /** Text content to display alongside the image. Allows JSX elements for maximum flexibility. */
  textPart: JSX.Element;
  // Optional props
  /** Other CSS style attributes for the image. */
  imageStyle?: CSSProperties;
}

/**
 * Text and media component
 *
 * Text describing some aspect of the project (difficulties, technologies, etc.) with a corresponding image to draw in
 * the user's attention.
 *
 * It accepts an image URL or path string.
 */
export default function TextAndMedia({ imageSide, image, altText, textPart, imageStyle }: TextAndMediaProps) {
  const imageWithStyle = (
    <img
      src={image}
      alt={altText}
      style={{
        borderRadius: 'var(--border-radius-lg)',
        ...imageStyle,
      }}
    />
  );

  return (
    <div className={`text-and-media text-and-media--${imageSide}`}>
      {imageWithStyle}
      <div className="text-part">{textPart}</div>
    </div>
  );
}
