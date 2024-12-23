import NumberButton from ".";
import type { Meta, StoryObj } from "@storybook/react";
import INumberButtonProps from "./NumberButtonProps";
import { BrowserRouter } from "react-router-dom";
import "@govbr-ds/core/dist/core.min.css";

const meta = {
	title: "@components/NumberButton",
	component: NumberButton,
	tags: ["autodocs"],
} satisfies Meta<typeof NumberButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = (args: INumberButtonProps) => (
    <BrowserRouter>
        <NumberButton {...args} />
    </BrowserRouter>
);
Default.args = { 
    ...Default.args,
    func: () => {alert("Deu bom viiiiiiiiiiiiiiiiiiiiu");},
    content: "Incremento ou decremento"
 };