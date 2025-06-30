import type { Decorator } from '@storybook/react-vite';
import { BrowserRouter } from 'react-router';

export const withRouter: Decorator = (Story, context) => {
  const mockReactRouter = context.parameters?.mockReactRouter;
  if (mockReactRouter) {
    const originalModule = require('react-router');
    Object.assign(originalModule, mockReactRouter);
  }

  return (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  );
};
