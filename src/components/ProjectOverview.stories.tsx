import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { projectIds } from '../constants';
import ProjectOverview from './ProjectOverview';

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
    id: 'portfolio',
    imageHeight: 'auto',
    width: 'auto',
  },
  argTypes: {
    id: {
      control: {
        type: 'select',
        options: projectIds,
      },
    },
  },
  component: ProjectOverview,
} satisfies Meta<typeof ProjectOverview>;
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
    const projectImage = canvas.getByRole('img', { name: /screenshot/i });
    const projectTitle = canvas.getByText(/portfolio/i);
    const projectDescription = canvas.getByText(/This website you're on now!/i);
    const link = canvas.getByRole('link', { name: /view portfolio details/i });

    await step('check the component renders properly', async () => {
      await expect(projectImage).toBeInTheDocument();
      await expect(projectImage).toHaveAttribute('alt', 'Portfolio screenshot');
      await expect(projectTitle).toBeInTheDocument();
      await expect(projectDescription).toBeInTheDocument();
    });

    await step('check the link points works correctly', async () => {
      await expect(link).toHaveAttribute('href', '/projects/portfolio');
      await expect(link).toHaveAttribute('aria-label', 'View Portfolio details');
      await expect(link).toHaveClass('glowing-border');
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

export const CustomImageHeight: Story = {
  args: {
    imageHeight: '200px',
  },
  play: async ({ canvas, step }) => {
    const projectImage = canvas.getByRole('img', { name: /screenshot/i });

    await step('check the image is the correct height', async () => {
      await expect(projectImage).toHaveStyle({ height: '200px' });
    });
  },
};

export const CustomWidth: Story = {
  args: {
    width: '400px',
  },
  play: async ({ canvas, step }) => {
    const container = canvas.getByRole('img', { name: /screenshot/i }).parentElement;

    await step('check the container is the correct width', async () => {
      await expect(container).toHaveStyle({ maxWidth: '400px' });
    });
  },
};
