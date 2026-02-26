import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TextAndMedia from './TextAndMedia';

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

const windowMatchMedia = window.matchMedia;

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  args: {
    imageSide: 'left',
    image: 'https://lipsum.app/640x480/',
    altText: 'Placeholder image',
    textPart: <p>This is a placeholder text alongside the image.</p>,
  },
  component: TextAndMedia,
  afterEach: () => {
    window.matchMedia = windowMatchMedia;
  },
} satisfies Meta<typeof TextAndMedia>;
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
    const image = canvas.getByAltText('Placeholder image');
    const text = canvas.getByText('This is a placeholder text alongside the image.');

    await expect(image).toBeVisible();
    await expect(text).toBeVisible();

    await step('check the image is to the left of the text', async () => {
      const imageRect = image.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      await step('check image left edge is to the left of text left edge', async () => {
        await expect(imageRect.left).toBeLessThan(textRect.left);
      });

      await step('check image right edge is to the left of or at text left edge', async () => {
        await expect(imageRect.right).toBeLessThanOrEqual(textRect.left);
      });
    });
  },
};

export const RightSide: Story = {
  args: {
    imageSide: 'right',
  },
  play: async ({ canvas, step }) => {
    const image = canvas.getByAltText('Placeholder image');
    const text = canvas.getByText('This is a placeholder text alongside the image.');

    await expect(image).toBeVisible();
    await expect(text).toBeVisible();

    await step('check the image is to the right of the text', async () => {
      const imageRect = image.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      await step('check image left edge is to the right of text right edge', async () => {
        await expect(imageRect.left).toBeGreaterThan(textRect.right);
      });

      await step('check image right edge is to the right of or at text right edge', async () => {
        await expect(imageRect.right).toBeGreaterThanOrEqual(textRect.right);
      });
    });
  },
};

// -----------------------------------------------------------------------------
// story variants. test arguments and their effects or state changes
// -----------------------------------------------------------------------------

export const Mobile: Story = {
  globals: { viewport: 'mobile1' },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvas, step }) => {
    const image = canvas.getByAltText('Placeholder image');
    const text = canvas.getByText('This is a placeholder text alongside the image.');

    await expect(image).toBeVisible();
    await expect(text).toBeVisible();

    await step('check the image is above the text', async () => {
      const imageRect = image.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      console.log('imageRect', imageRect);
      console.log('textRect', textRect);

      await step('check image top edge is above text top edge', async () => {
        await expect(imageRect.top).toBeLessThan(textRect.top);
      });

      await step('check image bottom edge is above text top edge', async () => {
        await expect(imageRect.bottom).toBeLessThan(textRect.top);
      });
    });
  },
};
