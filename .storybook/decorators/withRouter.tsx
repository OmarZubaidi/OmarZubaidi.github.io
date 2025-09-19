import type { Decorator } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';

export const withRouter: Decorator = (Story, context) => {
  return (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  );
};
