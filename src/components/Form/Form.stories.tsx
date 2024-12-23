import Form from ".";
import type { Meta, StoryObj } from "@storybook/react";
import "@govbr-ds/core/dist/core.min.css";
import { BrowserRouter } from "react-router-dom";

const meta = {
  title: "@components/Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = () => (
  <BrowserRouter>
    <Form />
  </BrowserRouter>
);

Default.args = {
  ...Default.args,
};
