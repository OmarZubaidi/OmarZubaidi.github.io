import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from '../assets/logo.svg?react';
import ImageButton from './ImageButton';

describe(ImageButton, () => {
  it('throws when both onClick and link are undefined', () => {
    expect.hasAssertions();
    expect(() => {
      render(<ImageButton image={<Logo />} label="Test button" />);
    }).toThrow('ImageButton must have at least one of onClick or link defined');
  });
});
