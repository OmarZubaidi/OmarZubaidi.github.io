import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import ToggleTheme from './ToggleTheme';

const meta = {
  component: ToggleTheme,
} satisfies Meta<typeof ToggleTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle: Story = {
  play: async ({ canvas, step }) => {
    const button = canvas.getByRole('button');
    const user = userEvent.setup({ skipClick: true });

    await expect(document.body.dataset.theme).toBe('light');
    await expect(canvas.getByTitle('bulb-on')).toBeInTheDocument();

    await step('check if the button is clickable', async () => {
      await user.click(button);
      await expect(document.body.dataset.theme).toBe('dark');
      await expect(canvas.getByTitle('bulb-off')).toBeInTheDocument();

      await user.click(button);
      await expect(document.body.dataset.theme).toBe('light');
      await expect(canvas.getByTitle('bulb-on')).toBeInTheDocument();
    });

    await step('check if the button is accessible', async () => {
      await expect(button).toHaveAccessibleName('Dark mode toggle');

      await expect(document.body.dataset.theme).toBe('light');
      await user.type(button, 'c');
      await expect(document.body.dataset.theme).toBe('light');
      await user.keyboard('{Enter}');
      await expect(document.body.dataset.theme).toBe('dark');
      await user.keyboard(' ');
      await expect(document.body.dataset.theme).toBe('light');
    });
  },
};
