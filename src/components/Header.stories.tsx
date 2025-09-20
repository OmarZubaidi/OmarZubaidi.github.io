import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Header from './Header';

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;

// -----------------------------------------------------------------------------
// constants and helper functions
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// default story. test core functionality, accessibility, and function calls
// -----------------------------------------------------------------------------

export const Default: Story = {
  play: async ({ canvas, step }) => {
    const logoIcon = canvas.getByLabelText('Return to home page');

    await step('check everything renders properly', async () => {
      await expect(logoIcon).toBeInTheDocument();
      await expect(logoIcon).toHaveAttribute('href', '/');

      const themeToggle = canvas.getByLabelText('Dark mode toggle');
      await expect(themeToggle).toBeInTheDocument();

      const heading = canvas.getByRole('heading');
      await expect(heading).toHaveTextContent('Omar');
    });
  },
};

// -----------------------------------------------------------------------------
// story variants. test arguments and their effects or state changes
// -----------------------------------------------------------------------------
