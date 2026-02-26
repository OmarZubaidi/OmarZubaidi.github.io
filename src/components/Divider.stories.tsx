import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Divider from './Divider';

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;
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
    const divider = canvas.getByRole('separator');

    await step('check everything renders properly', async () => {
      await expect(divider).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------
// story variants. test arguments and their effects or state changes
// -----------------------------------------------------------------------------

export const Mobile: Story = {
  globals: { viewport: 'mobile1' },
};
