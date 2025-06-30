import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Canvas } from 'storybook/internal/csf';
import { expect, userEvent } from 'storybook/test';
import ToggleTheme from './ToggleTheme';

const meta = {
  component: ToggleTheme,
} satisfies Meta<typeof ToggleTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

interface MatchesExpectedThemeProps {
  value: string | undefined;
  toBeFlipped: boolean;
  startsAsLightMode: boolean;
}
function matchesExpectedTheme({ value, toBeFlipped, startsAsLightMode }: MatchesExpectedThemeProps) {
  if (startsAsLightMode) {
    return toBeFlipped ? value === 'light' : value === 'dark';
  }
  return toBeFlipped ? value === 'dark' : value === 'light';
}

interface GetExpectedBulbProps {
  canvas: Canvas;
  toBeFlipped: boolean;
  startsAsLightMode: boolean;
}
function getExpectedBulb({ canvas, toBeFlipped, startsAsLightMode }: GetExpectedBulbProps) {
  if (startsAsLightMode) {
    return toBeFlipped ? canvas.getByTitle('bulb-on') : canvas.getByTitle('bulb-off');
  }
  return toBeFlipped ? canvas.getByTitle('bulb-off') : canvas.getByTitle('bulb-on');
}

export const Toggle: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const button = canvas.getByRole('button');

    const startsAsLightMode = document.body.dataset.theme === 'light';
    await expect(
      matchesExpectedTheme({
        value: document.body.dataset.theme,
        toBeFlipped: true,
        startsAsLightMode,
      }),
    ).toBeTruthy();
    await expect(getExpectedBulb({ canvas, toBeFlipped: true, startsAsLightMode })).toBeInTheDocument();

    await step('check if the button is clickable', async () => {
      await user.click(button);
      await expect(
        matchesExpectedTheme({
          value: document.body.dataset.theme,
          toBeFlipped: false,
          startsAsLightMode,
        }),
      ).toBeTruthy();
      await expect(getExpectedBulb({ canvas, toBeFlipped: false, startsAsLightMode })).toBeInTheDocument();

      await user.click(button);
      await expect(
        matchesExpectedTheme({
          value: document.body.dataset.theme,
          toBeFlipped: true,
          startsAsLightMode,
        }),
      ).toBeTruthy();
      await expect(getExpectedBulb({ canvas, toBeFlipped: true, startsAsLightMode })).toBeInTheDocument();
    });

    await step('check if the button is accessible', async () => {
      await expect(button).toHaveAccessibleName('Dark mode toggle');

      await expect(
        matchesExpectedTheme({
          value: document.body.dataset.theme,
          toBeFlipped: true,
          startsAsLightMode,
        }),
      ).toBeTruthy();
      await user.type(button, 'c');
      await expect(
        matchesExpectedTheme({
          value: document.body.dataset.theme,
          toBeFlipped: true,
          startsAsLightMode,
        }),
      ).toBeTruthy();
      await user.keyboard('{Enter}');
      await expect(
        matchesExpectedTheme({
          value: document.body.dataset.theme,
          toBeFlipped: false,
          startsAsLightMode,
        }),
      ).toBeTruthy();
      await user.keyboard(' ');
      await expect(
        matchesExpectedTheme({
          value: document.body.dataset.theme,
          toBeFlipped: true,
          startsAsLightMode,
        }),
      ).toBeTruthy();
    });
  },
};
