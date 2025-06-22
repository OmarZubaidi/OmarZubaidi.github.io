import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import ToggleTheme from './ToggleTheme';

const meta = {
  component: ToggleTheme,
} satisfies Meta<typeof ToggleTheme>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button');

    await expect(document.body.dataset.theme).toBe('light');
    await expect(canvas.getByTitle('bulb-on')).toBeInTheDocument();

    await userEvent.click(button);

    await expect(document.body.dataset.theme).toBe('dark');
    await expect(canvas.getByTitle('bulb-off')).toBeInTheDocument();

    // back to light mode to end test
    await userEvent.click(button);
  },
};
