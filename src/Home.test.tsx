import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './Home';

describe('Home Component', () => {
  it('displays correct text content', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeTruthy();
  });
});
