import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { withRouter } from './decorators/withRouter';
import { withThemeProvider } from './decorators/withThemeProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    docs: {
      controls: {
        sort: 'requiredFirst',
      },
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [withRouter, withThemeProvider],
  tags: ['autodocs'],
};

export default preview;
