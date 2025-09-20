import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import Header from './Header';

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const logo = canvas.getByLabelText('Return to home page');

    await step('check everything renders properly', async () => {
      await expect(logo).toBeInTheDocument();
      const themeToggle = canvas.getByLabelText('Dark mode toggle');
      await expect(themeToggle).toBeInTheDocument();
      const heading = canvas.getByRole('heading');
      await expect(heading).toHaveTextContent('Omar');
    });

    await step('check the logo is clickable', async () => {
      await user.click(logo);
      // todo assert it tries navigating to the home page
    });

    await step('check the logo is accessible', async () => {
      logo.focus();
      await user.keyboard('{Enter}');
      // todo assert it tries navigating to the home page
    });
  },
};
