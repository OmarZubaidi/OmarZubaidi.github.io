import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, isInaccessible, userEvent } from 'storybook/test';
import Footer from './Footer';

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

const createWindowOpenSpy = () => {
  const windowOpenSpy = fn();
  const originalWindowOpen = window.open;

  window.open = windowOpenSpy;

  return {
    spy: windowOpenSpy,
    restore: () => {
      window.open = originalWindowOpen;
    },
  };
};

export const Default: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const logo = canvas.getByLabelText('');
    const email = canvas.getByLabelText('Email me');
    const gitHub = canvas.getByLabelText('Check out my GitHub profile');
    const linkedIn = canvas.getByLabelText('Check out my LinkedIn profile');

    await step('check everything renders properly', async () => {
      await expect(logo).toBeInTheDocument();
      await expect(email).toBeInTheDocument();
      await expect(gitHub).toBeInTheDocument();
      await expect(linkedIn).toBeInTheDocument();
    });

    await step('check the email icon is clickable', async () => {
      const { spy, restore } = createWindowOpenSpy();

      await user.click(email);
      await expect(spy).toHaveBeenCalledWith('mailto:software.2.omar@zubaidi.aleeas.com', '_self');

      restore();
    });

    await step('check the github icon is clickable', async () => {
      const { spy, restore } = createWindowOpenSpy();

      await user.click(gitHub);
      await expect(spy).toHaveBeenCalledWith('https://github.com/omarzubaidi', '_blank');

      restore();
    });

    await step('check the linkedin icon is clickable', async () => {
      const { spy, restore } = createWindowOpenSpy();

      await user.click(linkedIn);
      await expect(spy).toHaveBeenCalledWith('https://www.linkedin.com/in/omarzubaidi', '_blank');

      restore();
    });

    await step('check the logo is inaccessible (decorative)', () => {
      isInaccessible(logo);
    });

    await step('check the email icon is accessible', async () => {
      const { spy, restore } = createWindowOpenSpy();

      email.focus();
      await user.keyboard('{Enter}');
      await expect(spy).toHaveBeenCalledWith('mailto:software.2.omar@zubaidi.aleeas.com', '_self');

      restore();
    });

    await step('check the github icon is accessible', async () => {
      const { spy, restore } = createWindowOpenSpy();

      gitHub.focus();
      await user.keyboard('{Enter}');
      await expect(spy).toHaveBeenCalledWith('https://github.com/omarzubaidi', '_blank');

      restore();
    });

    await step('check the linkedin icon is accessible', async () => {
      const { spy, restore } = createWindowOpenSpy();

      linkedIn.focus();
      await user.keyboard('{Enter}');
      await expect(spy).toHaveBeenCalledWith('https://www.linkedin.com/in/omarzubaidi', '_blank');

      restore();
    });
  },
};
