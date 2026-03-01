import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import TextAndMedia from './TextAndMedia';

// -----------------------------------------------------------------------------
// constants and helper functions
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

const windowMatchMedia = window.matchMedia;

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  args: {
    mediaSide: 'left',
    mediaPart: (
      <img src="https://lipsum.app/640x480/" alt="Placeholder" style={{ borderRadius: 'var(--border-radius-lg)' }} />
    ),
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
// default story. test core functionality, accessibility, and function calls
// -----------------------------------------------------------------------------

export const Default: Story = {
  globals: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  play: async ({ canvas, step }) => {
    const image = canvas.getByAltText('Placeholder');
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
    const image = canvas.getByAltText('Placeholder');
    const text = canvas.getByText('This is a placeholder text alongside the image.');

    await expect(image).toBeVisible();
    await expect(text).toBeVisible();

    await step('check the image is above the text', async () => {
      const imageRect = image.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      await step('check image top edge is above text top edge', async () => {
        await expect(imageRect.top).toBeLessThan(textRect.top);
      });

      await step('check image bottom edge is above text top edge', async () => {
        await expect(imageRect.bottom).toBeLessThan(textRect.top);
      });
    });
  },
};

export const Tablet: Story = {
  globals: { viewport: 'tablet' },
};

export const RightSide: Story = {
  args: {
    mediaSide: 'right',
  },
  play: async ({ canvas, step }) => {
    const image = canvas.getByAltText('Placeholder');
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

export const WithReactComponent: Story = {
  args: {
    mediaSide: 'left',
    mediaPart: (
      <div
        style={{
          borderRadius: 'var(--border-radius-lg)',
          padding: '1rem',
          backgroundColor: 'var(--color-secondary)',
          width: '100px',
          height: '50px',
        }}
      />
    ),
    textPart: <p>This is a text description alongside a react component.</p>,
  },
};

export const WithLongText: Story = {
  args: {
    mediaSide: 'right',
    mediaPart: (
      <img
        src="https://lipsum.app/400x400/"
        alt="Square gray box"
        style={{ borderRadius: 'var(--border-radius-lg)' }}
      />
    ),
    textPart: (
      <div>
        <h3>Long Form Content</h3>
        {/* cSpell:disable */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        {/* cSpell:enable */}
      </div>
    ),
  },
};

export const WithShortText: Story = {
  args: {
    mediaSide: 'left',
    mediaPart: (
      <img
        src="https://lipsum.app/300x200/"
        alt="Small square gray box"
        style={{ borderRadius: 'var(--border-radius-lg)' }}
      />
    ),
    textPart: <p>Brief text.</p>,
  },
};

export const WithList: Story = {
  args: {
    mediaSide: 'right',
    mediaPart: (
      <img
        src="https://lipsum.app/500x300/"
        alt="Medium-sized gray box"
        style={{ borderRadius: 'var(--border-radius-lg)' }}
      />
    ),
    textPart: (
      <div>
        <h3>Key Features</h3>
        <ul>
          <li>Responsive design</li>
          <li>Accessibility compliant</li>
          <li>Fast performance</li>
          <li>Modern styling</li>
        </ul>
      </div>
    ),
  },
};

export const WithHeadingAndText: Story = {
  args: {
    mediaSide: 'left',
    mediaPart: (
      <img
        src="https://lipsum.app/600x400/"
        alt="Large square gray box"
        style={{ borderRadius: 'var(--border-radius-lg)' }}
      />
    ),
    textPart: (
      <div>
        <h2>Section Title</h2>
        <p>This demonstrates a common pattern of heading followed by descriptive text.</p>
      </div>
    ),
  },
};
