import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import ImageCarousel from './ImageCarousel';

// -----------------------------------------------------------------------------
// constants and helper functions
// -----------------------------------------------------------------------------

const createImagePlaceholder = (color: string, index: number) => (
  <img src={'https://lipsum.app/50x50/' + color + '/' + color} alt={'logo ' + index.toString()} />
);

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

const windowMatchMedia = window.matchMedia;

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  component: ImageCarousel,
  args: {
    logos: [
      '990057',
      'b30068',
      '7e3faa',
      '8b0050',
      '9e2f7b',
      '6a1fa8',
      'c2006f',
      'a0007e',
      '5c2d91',
      'd63384',
      '3b0a6b',
      'e0456e',
    ].map((color, i) => createImagePlaceholder(color, i)),
  },
  argTypes: {
    logos: {
      control: 'object',
      description: 'Array of image JSX elements to display in the grid',
    },
    containerStyle: {
      control: 'object',
      description: 'CSS styles for the carousel container',
    },
  },
  afterEach: () => {
    window.matchMedia = windowMatchMedia;
  },
} satisfies Meta<typeof ImageCarousel>;
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
  args: {},
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('check the grid carousel renders correctly', async () => {
      await expect(carousel).toBeInTheDocument();
      await expect(carousel).toHaveStyle({ display: 'flex', flexDirection: 'column' });
      await expect(carousel.children).toHaveLength(2);

      const rows = Array.from(carousel.children) as HTMLElement[];
      for (const row of rows) {
        await expect(row).toHaveStyle({ animationDuration: '20s' });
      }
    });

    await step('check all logos are accessible', async () => {
      const visibleLogos = canvas.getAllByRole('img');
      await expect(visibleLogos).toHaveLength(12);
    });

    await step('check aria-hidden duplicates exist for seamless loop', async () => {
      const hiddenImages = carousel.querySelectorAll('img[aria-hidden="true"]');
      // 12 logos * 2 duplicates
      await expect(hiddenImages).toHaveLength(24);
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

export const SingleRow: Story = {
  args: { rows: 1 },
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('renders exactly one row', async () => {
      await expect(carousel.children).toHaveLength(1);
    });
  },
};

export const ThreeRows: Story = {
  args: { rows: 3 },
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('renders exactly three rows', async () => {
      await expect(carousel.children).toHaveLength(3);
    });
  },
};

export const FastAnimation: Story = {
  args: { animationDuration: '5s' },
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('rows use the fast animation duration', async () => {
      const rows = Array.from(carousel.children) as HTMLElement[];
      for (const row of rows) {
        await expect(row).toHaveStyle({ animationDuration: '5s' });
      }
    });
  },
};

export const SlowAnimation: Story = {
  args: { animationDuration: '60s' },
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('rows use the slow animation duration', async () => {
      const rows = Array.from(carousel.children) as HTMLElement[];
      for (const row of rows) {
        await expect(row.style.animation).toContain('60s');
      }
    });
  },
};

export const CustomContainerStyle: Story = {
  args: { containerStyle: { maxWidth: '400px', backgroundColor: 'teal' } },
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('applies custom container styles', async () => {
      await expect(carousel).toHaveStyle({ maxWidth: '400px' });
      await expect(carousel.style.backgroundColor).toBe('teal');
    });
  },
};

export const FewLogos: Story = {
  args: {
    logos: ['990057', 'b30068', 'c2006f'].map((color, i) => createImagePlaceholder(color, i)),
  },
  play: async ({ canvas, step }) => {
    await step('renders the correct number of accessible logos', async () => {
      const visibleLogos = canvas.getAllByRole('img');
      await expect(visibleLogos).toHaveLength(3);
    });
  },
};

export const PrefersReducedMotion: Story = {
  beforeEach: () => {
    window.matchMedia = fn().mockImplementation((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return { matches: true };
      }
      return windowMatchMedia(query);
    });
  },
  play: async ({ canvas, step }) => {
    const carousel = canvas.getByLabelText('Tech stack logos carousel');

    await step('does not apply animation styles when prefers-reduced-motion is enabled', async () => {
      const animatedElement = carousel.querySelector('[style*="animation"]');
      await expect(animatedElement).toBeNull();
    });
  },
};
