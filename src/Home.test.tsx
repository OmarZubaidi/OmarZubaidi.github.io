import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('home component', () => {
  it('displays correct text content', () => {
    expect.hasAssertions();

    render(<Home />);

    expect(screen.getByText('Home')).toBeDefined();
  });
});
