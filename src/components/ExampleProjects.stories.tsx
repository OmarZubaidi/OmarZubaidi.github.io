import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { projectIds } from '../constants';
import ExampleProjects from './ExampleProjects';

// -----------------------------------------------------------------------------
// constants and helper functions
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  args: {
    ids: ['portfolio', 'portfolio2', 'portfolio3'],
    width: 'auto',
  },
  argTypes: {
    ids: {
      control: {
        type: 'multi-select',
        options: projectIds,
      },
    },
  },
  component: ExampleProjects,
} satisfies Meta<typeof ExampleProjects>;
export default meta;
type Story = StoryObj<typeof meta>;

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
    const leftImage = canvas.getByRole('img', { name: /portfolio screenshot/i, hidden: true });
    const middleImage = canvas.getByRole('img', { name: /portfolio2 screenshot/i, hidden: true });
    const rightImage = canvas.getByRole('img', { name: /portfolio3 screenshot/i, hidden: true });

    await step('check the component renders properly', async () => {
      await expect(leftImage).toBeInTheDocument();
      await expect(middleImage).toBeInTheDocument();
      await expect(rightImage).toBeInTheDocument();
    });

    await step('check the group has the correct aria-label', async () => {
      const group = canvas.getByLabelText(/screenshots of example projects overlapping each other/i);
      await expect(group).toBeInTheDocument();
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
