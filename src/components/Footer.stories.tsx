import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, isInaccessible } from 'storybook/test';
import Footer from './Footer';

// -----------------------------------------------------------------------------
// functions that override default behavior
// -----------------------------------------------------------------------------

const windowMatchMedia = window.matchMedia;

// -----------------------------------------------------------------------------
// core story definition, including before and after hooks and argTypes
// -----------------------------------------------------------------------------

const meta = {
  component: Footer,
  afterEach: () => {
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
      await expect(emailIcon).toHaveAttribute('target', '_self');
    });

    await step('check the github icon has the correct link', async () => {
      await expect(gitHubIcon).toHaveAttribute('href', 'https://github.com/omarzubaidi');
      await expect(gitHubIcon).toHaveAttribute('target', '_blank');
    });

    await step('check the linkedin icon has the correct link', async () => {
      await expect(linkedInIcon).toHaveAttribute('href', 'https://www.linkedin.com/in/omarzubaidi');
      await expect(linkedInIcon).toHaveAttribute('target', '_blank');
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
