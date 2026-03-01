import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ImageCarousel from './ImageCarousel';

describe(ImageCarousel, () => {
  it('throws error when no logos are provided', () => {
    expect.hasAssertions();
    expect(() => {
      render(<ImageCarousel logos={[]} />);
    }).toThrow('ImageCarousel must have at least one logo');
  });
});
