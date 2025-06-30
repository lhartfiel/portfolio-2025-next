import type { Meta, StoryObj } from "@storybook/nextjs";

import { fn } from "storybook/test";
import { action } from "storybook/actions";
import { Button } from "./Button";
import { ButtonText } from "./ButtonText";

const meta = {
  title: "Components/Button",
  component: Button,
  subcomponents: { ButtonText },
  parameters: {
    docs: {
      description: {
        component: "This displays the button component with different options.",
      },
    },
  },
  args: {
    text: "Button",
    size: "large",
    type: "primary",
    disabled: false,
    callback: action("on-click"),
  },
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["primary", "secondary"],
      },
      description: "Type of the button",
    },
    size: {
      control: {
        type: "select",
        options: ["large", "small"],
      },
      description: "Size of the button",
    },
    text: {
      description: "Button text. Will truncate if longer than 16 characters.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "large",
    type: "primary",
    text: "Button",
    disabled: false,
    callback: fn(),
    customClass: "font-bold inline",
  },
};

export const LargePrimaryButton: Story = {
  args: {
    size: "large",
    type: "primary",
    text: "Large Primary",
    disabled: false,
    callback: fn(),
    customClass: "font-bold inline",
  },
};

export const SmallPrimaryButton: Story = {
  args: {
    size: "small",
    type: "primary",
    text: "Small Primary",
    disabled: false,
  },
};

export const LargeSecondaryButton: Story = {
  args: {
    size: "large",
    type: "secondary",
    text: "Large Secondary",
    disabled: false,
  },
};

export const SmallSecondaryButton: Story = {
  args: {
    size: "small",
    type: "secondary",
    text: "Small Secondary",
    disabled: false,
  },
};
