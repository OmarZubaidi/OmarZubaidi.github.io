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
  globals: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
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

export const Tablet: Story = {
  globals: { viewport: 'tablet' },
};

export const InContext: Story = {
  decorators: [
    (Story) => (
      <div>
        <p>This is a long paragraph of content above the dividers to demonstrate spacing and layout.</p>
        <Story />
        <p>This is a long paragraph of content between the dividers to demonstrate spacing and layout.</p>
        <Story />
        <p>This is a long paragraph of content below the dividers to demonstrate spacing and layout.</p>
      </div>
    ),
  ],
};
