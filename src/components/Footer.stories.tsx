import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, isInaccessible, userEvent } from 'storybook/test';
import Footer from './Footer';

const windowOpenSpy = fn();
const windowOpen = window.open;

const meta = {
  component: Footer,
  beforeEach: () => {
    windowOpenSpy.mockClear();
    window.open = windowOpenSpy;
  },
  afterEach: () => {
    window.open = windowOpen;
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const logo = canvas.getByLabelText('');
    const emailIcon = canvas.getByLabelText('Email me');
    const gitHubIcon = canvas.getByLabelText('Check out my GitHub profile');
    const linkedInIcon = canvas.getByLabelText('Check out my LinkedIn profile');

    await step('check everything renders properly', async () => {
      await expect(logo).toBeInTheDocument();
      await expect(emailIcon).toBeInTheDocument();
      await expect(gitHubIcon).toBeInTheDocument();
      await expect(linkedInIcon).toBeInTheDocument();
    });

    await step('check the logo is inaccessible (decorative)', () => {
      isInaccessible(logo);
    });

    await step('check the email icon is clickable and accessible', async () => {
      const emailLinkArguments = ['mailto:software.2.omar@zubaidi.aleeas.com', '_self'] as const;

      await step('check the email icon is clickable', async () => {
        await user.click(emailIcon);
        await expect(windowOpenSpy).toHaveBeenCalledWith(...emailLinkArguments);
      });

      await step('check the email icon is accessible', async () => {
        emailIcon.focus();
        await user.keyboard('{Enter}');
        await expect(windowOpenSpy).toHaveBeenCalledWith(...emailLinkArguments);
      });
    });

    await step('check the github icon is clickable and accessible', async () => {
      const gitHubLinkArguments = ['https://github.com/omarzubaidi', '_blank'] as const;

      await step('check the github icon is clickable', async () => {
        await user.click(gitHubIcon);
        await expect(windowOpenSpy).toHaveBeenCalledWith(...gitHubLinkArguments);
      });

      await step('check the github icon is accessible', async () => {
        gitHubIcon.focus();
        await user.keyboard('{Enter}');
        await expect(windowOpenSpy).toHaveBeenCalledWith(...gitHubLinkArguments);
      });
    });

    await step('check the linkedin icon is clickable and accessible', async () => {
      const linkedInLinkArguments = ['https://www.linkedin.com/in/omarzubaidi', '_blank'] as const;

      await step('check the linkedin icon is clickable', async () => {
        await user.click(linkedInIcon);
        await expect(windowOpenSpy).toHaveBeenCalledWith(...linkedInLinkArguments);
      });

      await step('check the linkedin icon is accessible', async () => {
        linkedInIcon.focus();
        await user.keyboard('{Enter}');
        await expect(windowOpenSpy).toHaveBeenCalledWith(...linkedInLinkArguments);
      });
    });
  },
};
