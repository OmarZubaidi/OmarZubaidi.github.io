import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useThemeState } from './useThemeState';

function MissingProvider() {
  const { theme } = useThemeState();
  return theme;
}

describe(useThemeState, () => {
  it('throws when context is missing', () => {
    expect.hasAssertions();
    expect(() => render(<MissingProvider />)).toThrow('useThemeState: State must be used within StateProvider');
  });
});
