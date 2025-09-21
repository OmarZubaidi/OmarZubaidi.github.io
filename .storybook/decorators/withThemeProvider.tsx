import type { Decorator } from '@storybook/react-vite';
import { ThemeStateProvider } from '../../src/hooks/useThemeState';

export const withThemeProvider: Decorator = (Story, context) => {
  return (
    <ThemeStateProvider>
      <Story {...context} />
    </ThemeStateProvider>
  );
};
