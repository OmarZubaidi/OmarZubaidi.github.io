import type { Decorator } from '@storybook/react-vite';
import * as reactRouterModule from 'react-router';
import { BrowserRouter } from 'react-router';

export const withRouter: Decorator = (Story, context) => {
  const mockReactRouter = context.parameters?.mockReactRouter;
  if (mockReactRouter) {
    Object.assign(reactRouterModule, mockReactRouter);
  }

  return (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  );
};
