import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LogoCarousel from './LogoCarousel';

describe(LogoCarousel, () => {
  it('throws error when no logos are provided', () => {
    expect.hasAssertions();
    expect(() => {
      render(<LogoCarousel logos={[]} />);
    }).toThrow('LogoCarousel must have at least one logo');
  });
});
