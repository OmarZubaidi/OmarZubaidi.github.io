import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Canvas } from 'storybook/internal/csf';
import { expect, userEvent } from 'storybook/test';
import ToggleTheme from './ToggleTheme';

const meta = {
  component: ToggleTheme,
} satisfies Meta<typeof ToggleTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

interface ThemeStateVerificationProps {
  theme: string | undefined;
  canvas: Canvas;
  expectLightMode: boolean;
}
async function assertThemeAndBulbState({ theme, canvas, expectLightMode }: ThemeStateVerificationProps) {
  await expect(theme).toBe(expectLightMode ? 'light' : 'dark');
  await expect(canvas.getByTitle(`bulb-${expectLightMode ? 'on' : 'off'}`)).toBeInTheDocument();
}

export const Toggle: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const button = canvas.getByRole('button');
    const startsAsLightMode = document.body.dataset.theme === 'light';

    await step('check the button is rendered properly', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName('Dark mode toggle');
      await assertThemeAndBulbState({
        theme: document.body.dataset.theme,
        canvas,
        expectLightMode: startsAsLightMode,
      });
    });

    await step('check if the button is clickable', async () => {
      // changes
      await user.click(button);
      await assertThemeAndBulbState({
        theme: document.body.dataset.theme,
        canvas,
        expectLightMode: !startsAsLightMode,
      });

      // back to original
      await user.click(button);
      await assertThemeAndBulbState({
        theme: document.body.dataset.theme,
        canvas,
        expectLightMode: startsAsLightMode,
      });
    });

    await step('check if the button is accessible', async () => {
      // doesn't trigger button
      await user.type(button, 'c');
      await assertThemeAndBulbState({
        theme: document.body.dataset.theme,
        canvas,
        expectLightMode: startsAsLightMode,
      });

      // triggers button, changes
      await user.keyboard('{Enter}');
      await assertThemeAndBulbState({
        theme: document.body.dataset.theme,
        canvas,
        expectLightMode: !startsAsLightMode,
      });

      // back to original
      await user.keyboard(' ');
      await assertThemeAndBulbState({
        theme: document.body.dataset.theme,
        canvas,
        expectLightMode: startsAsLightMode,
      });
    });
  },
};
