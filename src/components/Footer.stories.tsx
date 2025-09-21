import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, isInaccessible, userEvent } from 'storybook/test';
import Footer from './Footer';

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

const windowOpenSpy = fn();
const windowOpen = window.open;
const windowMatchMedia = window.matchMedia;

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  component: Footer,
  beforeEach: () => {
    window.open = windowOpenSpy;
  },
  afterEach: () => {
    windowOpenSpy.mockClear();
    window.open = windowOpen;
    window.matchMedia = windowMatchMedia;
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

// -----------------------------------------------------------------------------
// constants and helper functions
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// default story. test core functionality, accessibility, and function calls
// -----------------------------------------------------------------------------

export const Default: Story = {
  play: async ({ canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const logo = canvas.getByTitle('logo');
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

    await step('check the email icon has the correct link', async () => {
      await expect(emailIcon).toHaveAttribute('href', 'mailto:software.2.omar@zubaidi.aleeas.com');
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

// -----------------------------------------------------------------------------
// story variants. test arguments and their effects or state changes
// -----------------------------------------------------------------------------

export const LightMode: Story = {
  play: async ({ canvas }) => {
    const linkedInBlack = canvas.getByTitle('linkedin-black');
    await expect(linkedInBlack).toBeInTheDocument();
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
  play: async ({ canvas }) => {
    const linkedInWhite = canvas.getByTitle('linkedin-white');
    await expect(linkedInWhite).toBeInTheDocument();
  },
};
