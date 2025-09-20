import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Canvas } from 'storybook/internal/csf';
import { expect, fn, userEvent } from 'storybook/test';
import ToggleTheme from './ToggleTheme';

const windowMatchMedia = window.matchMedia;

const meta = {
  component: ToggleTheme,
  afterEach: () => {
    window.matchMedia = windowMatchMedia;
  },
} satisfies Meta<typeof ToggleTheme>;
export default meta;
type Story = StoryObj<typeof meta>;

async function assertLightMode(canvas: Canvas) {
  await expect(document.body.dataset.theme).toBe('light');
  await expect(canvas.getByTitle('bulb-on')).toBeInTheDocument();
}

async function assertDarkMode(canvas: Canvas) {
  await expect(document.body.dataset.theme).toBe('dark');
  await expect(canvas.getByTitle('bulb-off')).toBeInTheDocument();
}

export const Default: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const button = canvas.getByRole('button');

    await step('check the button renders properly', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName('Dark mode toggle');
      await expect(button.hasAttribute('aria-live')).toBe(true);
      await assertLightMode(canvas);
    });

    await step('check the button is clickable', async () => {
      await user.click(button);
      await assertDarkMode(canvas);

      await user.click(button);
      await assertLightMode(canvas);
    });

    await step('check the button is accessible', async () => {
      // doesn't trigger button
      await user.type(button, 'c');
      await assertLightMode(canvas);

      // triggers button
      await user.keyboard('{Enter}');
      await assertDarkMode(canvas);

      // triggers button
      await user.keyboard(' ');
      await assertLightMode(canvas);
    });
  },
};

export const LightMode: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const button = canvas.getByRole('button');

    await step('check the button starts in light mode', async () => {
      await assertLightMode(canvas);
    });

    await step('check the button can toggle to dark mode', async () => {
      await user.click(button);
      await assertDarkMode(canvas);
      await user.click(button);
      await assertLightMode(canvas);
    });
  },
};

export const DarkMode: Story = {
  beforeEach: () => {
    window.matchMedia = fn().mockImplementation((query: string) => {
      if (query === '(prefers-color-scheme: dark)') {
        return { matches: true };
      }
      return windowMatchMedia(query);
    });
  },
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const button = canvas.getByRole('button');

    await step('check the button starts in dark mode', async () => {
      await assertDarkMode(canvas);
    });

    await step('check the button can toggle to light mode', async () => {
      await user.click(button);
      await assertLightMode(canvas);
      await user.click(button);
      await assertDarkMode(canvas);
    });
  },
};
