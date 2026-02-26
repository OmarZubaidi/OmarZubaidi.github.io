import { type JSX } from 'react';

interface TextAndMediaProps {
  /** Whether the media is on the left or right of the text. On small screens, the media will always be above the text. */
  mediaSide: 'left' | 'right';
  /** React element to display alongside the text (e.g., image, video, chart, etc.). */
  mediaPart: JSX.Element;
  /** Text content to display alongside the media. Allows JSX elements for maximum flexibility. */
  textPart: JSX.Element;
}

/**
 * Text and media component
 *
 * Text describing some aspect of the project (difficulties, technologies, etc.) with a corresponding media element to draw in
 * the user's attention.
 *
 * It accepts any React element (ideally an image or something similarly eye-catching) as the media part.
 */
export default function TextAndMedia({ mediaSide, mediaPart, textPart }: TextAndMediaProps) {
  return (
    <div className={`text-and-media text-and-media--${mediaSide}`}>
      {mediaPart}
      <div className="text-part">{textPart}</div>
    </div>
  );
}
