import HarryPotterAPI from ".";
import type { Meta, StoryObj } from "@storybook/react";
import "@govbr-ds/core/dist/core.min.css";
import { BrowserRouter } from "react-router-dom";

const meta = {
    title: "@components/HarryPotterAPI",
    component: HarryPotterAPI, 
    tags: ["autodocs"]
} satisfies Meta<typeof HarryPotterAPI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = () => (
    <BrowserRouter>
        <HarryPotterAPI />
    </BrowserRouter>
);

Default.args = {
    ...Default.args
}
