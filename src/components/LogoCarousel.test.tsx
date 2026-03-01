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

  it('throws error when rows is not a positive integer', () => {
    expect.hasAssertions();
    expect(() => {
      render(<LogoCarousel logos={[<img src="test" alt="test" />]} rows={0} />);
    }).toThrow('LogoCarousel "rows" must be a positive integer (>= 1)');
    expect(() => {
      render(<LogoCarousel logos={[<img src="test" alt="test" />]} rows={-1} />);
    }).toThrow('LogoCarousel "rows" must be a positive integer (>= 1)');
  });
});
