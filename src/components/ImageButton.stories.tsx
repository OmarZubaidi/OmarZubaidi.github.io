import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent } from 'storybook/test';
import Logo from '../assets/logo.svg?react';
import ImageButton from './ImageButton';

const meta = {
  component: ImageButton,
  args: {
    onClick: fn(),
    image: <Logo />,
    label: 'Go to home page',
    padding: 8,
  },
  beforeEach: () => {
    meta.args.onClick.mockClear();
  },
  argTypes: {
    image: {
      table: {
        disable: true,
      },
    },
    label: {
      control: 'text',
    },
    onClick: {
      action: 'onClick',
    },
    height: {
      control: 'number',
    },
    padding: {
      control: 'number',
    },
    buttonStyle: {
      control: 'object',
      description: 'CSS styles for the button',
    },
    imageStyle: {
      control: 'object',
      description: 'CSS styles for the image',
    },
  },
} satisfies Meta<typeof ImageButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LogoIcon: Story = {
  name: 'Logo',
  args: {
    height: 48,
    buttonStyle: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#212121',
    },
  },
  play: async ({ args, canvas, step }) => {
    const user = userEvent.setup({ skipClick: true });
    const button = canvas.getByRole('button');

    await step('check the button is renders correctly', async () => {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName('Go to home page');
      await expect(button).toHaveStyle('height: 64px');
      await expect(button).toHaveStyle('padding: 8px');
      await expect(button).toHaveStyle('border-style: none');
      await expect(button).toHaveStyle('color: #212121');
      await expect(button).toHaveStyle('cursor: pointer');
    });

    await step('check the button can be clicked', async () => {
      await user.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('check the button is accessible', async () => {
      button.focus();
      await user.keyboard('{Enter}');
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};

export const Primary: Story = {
  args: {
    height: 24,
    buttonStyle: {
      backgroundColor: 'fuchsia',
      border: '2px solid fuchsia',
      borderRadius: 12,
      color: 'white',
    },
  },
};

export const Secondary: Story = {
  args: {
    height: 24,
    buttonStyle: {
      backgroundColor: 'transparent',
      border: '2px solid fuchsia',
      borderRadius: 12,
      color: 'fuchsia',
    },
  },
};
