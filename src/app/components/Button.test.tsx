import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

const typeProp = "primary";
const sizeProp = "large";
const textProp = "Click Me";
const linkProp = "/test-link";
const disabledProp = false;
const customClassProp = "text-blue-500";
const mockCallback = jest.fn();

const renderButton = (props = {}) => {
  return render(
    <Button
      type={typeProp}
      size={sizeProp}
      text={textProp}
      customClass={customClassProp}
      disabled={disabledProp}
      link={linkProp}
      callback={mockCallback}
      {...props}
    />
  );
};

describe("Button Component with link prop", () => {
  it("should display the link properties", () => {
    renderButton({ callback: "" });
    expect(screen.getByRole("link", { name: /click me/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /click me/i })).toHaveAttribute(
      "href",
      linkProp
    );
  });

  it("should display the correct class names when the type is primary", () => {
    renderButton({ callback: "" });
    const linkEl = screen.getByRole("link", { name: /click me/i });
    expect(linkEl).toHaveClass(
      "relative inline-block font-kanit font-bold rounded-[20px] transition duration-300 ease-in-out text-blue-500 bg-accent border-1 border-accent text-black hover:brightness-110 hover:shadow-btn"
    );
  });

  it("should display the correct class names when the type is not primary", () => {
    renderButton({ callback: "", type: "secondary" });
    const linkEl = screen.getByRole("link", { name: /click me/i });
    expect(linkEl).toHaveClass(
      "relative inline-block font-kanit font-bold rounded-[20px] transition duration-300 ease-in-out text-blue-500 bg-white border-1 border-accent text-accent hover:bg-accent hover:text-white "
    );
  });

  it("should display the correct class name when size is large and disabled is false", () => {
    renderButton({ callback: "", type: "secondary" });
    const linkEl = screen.getByRole("link", { name: /click me/i });
    const buttonText = linkEl.querySelector("p");
    expect(buttonText).toHaveClass(
      "group relative flex items-center justify-center w-[230px] py-[9px] cursor-pointer"
    );
  });

  it("should display the correct class name when size is small and disabled is true", () => {
    renderButton({
      callback: "",
      type: "secondary",
      size: "small",
      disabled: true,
    });
    const linkEl = screen.getByRole("link", { name: /click me/i });
    const buttonText = linkEl.querySelector("p");
    expect(buttonText).toHaveClass(
      "group relative flex items-center justify-center py-[7px] px-[14px] cursor-not-allowed"
    );
  });

  it("should display the arrow icon when size is large and disabled is false", () => {
    renderButton({ callback: "" });
    const linkEl = screen.getByRole("link", { name: /click me/i });
    const arrowIcon = linkEl.querySelector("p")?.querySelector("svg");
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveClass("text-intro-sm");
  });
});

describe("Button Component with callback function", () => {
  it("should display the button with correct classnames when primary and not disabled", () => {
    renderButton({ link: undefined });
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveClass(
      "relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out text-blue-500 bg-accent border-1 border-accent text-black"
    );
  });

  it("should display correct class names when primary and disabled", () => {
    renderButton({ link: undefined, disabled: true });
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveClass(
      "relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out text-blue-500 bg-portfolio-gray cursor-not-allowed text-black"
    );
  });

  it("should display correct class names if not primary and not disabled", () => {
    renderButton({ link: undefined, type: "secondary" });
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveClass(
      "relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out text-blue-500 bg-white border-1 border-accent text-accent hover:bg-accent hover:text-white"
    );
  });

  it("should trigger callback when clicked", async () => {
    renderButton({ link: undefined });

    const buttonEl = screen.getByRole("button");

    await userEvent.click(buttonEl);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should not trigger callback when disabled", async () => {
    renderButton({ link: undefined, disabled: true });

    const buttonEl = screen.getByRole("button");

    await userEvent.click(buttonEl);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });

  it("should return null when callback is not provided", async () => {
    renderButton({ link: undefined, callback: null });

    const buttonEl = screen.getByRole("button");

    await userEvent.click(buttonEl);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});
