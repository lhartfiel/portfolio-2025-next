import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonLink } from "./ButtonLink";

const buttonTextProp = "Click Me";
const customClassProp = "text-blue-500";
const mockCallback = jest.fn();

describe("ButtonLink Component", () => {
  it("should display the a tag with the blank href", () => {
    render(
      <ButtonLink
        buttonText={buttonTextProp}
        customClass={customClassProp}
        callback={mockCallback}
      />
    );
    const linkEl = screen.getByTestId("button-link");
    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "#");
  });

  it("should display the button text", () => {
    render(
      <ButtonLink
        buttonText={buttonTextProp}
        customClass={customClassProp}
        callback={mockCallback}
      />
    );
    expect(screen.getByTestId("button-text")).toHaveTextContent(buttonTextProp);
    expect(screen.getByTestId("button-text")).toHaveClass("text-link relative");
  });

  it("should display the font awesome arrow icon", () => {
    render(
      <ButtonLink
        buttonText={buttonTextProp}
        customClass={customClassProp}
        callback={mockCallback}
      />
    );
    const arrowWrapper = screen.getByTestId("arrow-icon");
    const arrowIcon = arrowWrapper.querySelector("svg");
    expect(arrowIcon).toHaveClass("ml-1 transition duration-300 rotate-0");
  });

  it("should display the rotated icon when the button is clicked", async () => {
    render(
      <ButtonLink
        buttonText={buttonTextProp}
        customClass={customClassProp}
        callback={mockCallback}
      />
    );
    const button = screen.getByTestId("button-link");
    const arrowWrapper = screen.getByTestId("arrow-icon");
    const arrowIcon = arrowWrapper.querySelector("svg");
    expect(arrowIcon).toHaveClass("ml-1 transition duration-300 rotate-0");

    await userEvent.click(button);

    expect(arrowIcon).toHaveClass("ml-1 transition duration-300 rotate-180");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should display the switch the icon rotation classes when the button is clicked multiple times", async () => {
    render(
      <ButtonLink
        buttonText={buttonTextProp}
        customClass={customClassProp}
        callback={mockCallback}
      />
    );
    const button = screen.getByTestId("button-link");
    const arrowWrapper = screen.getByTestId("arrow-icon");
    const arrowIcon = arrowWrapper.querySelector("svg");
    expect(arrowIcon).toHaveClass("ml-1 transition duration-300 rotate-0");

    await userEvent.click(button);

    expect(arrowIcon).toHaveClass("ml-1 transition duration-300 rotate-180");
    expect(mockCallback).toHaveBeenCalledTimes(1);

    await userEvent.click(button);
    expect(arrowIcon).toHaveClass("ml-1 transition duration-300 rotate-0");
  });

  it("should display the custom class on the a tag", async () => {
    render(
      <ButtonLink
        buttonText={buttonTextProp}
        customClass={customClassProp}
        callback={mockCallback}
      />
    );
    const buttonEl = screen.getByTestId("button-link");
    expect(buttonEl).toHaveClass(
      `flex w-full text-link-wrapper body-sm font-semibold ${customClassProp}`
    );
  });
});
