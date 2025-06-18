import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import userEvent from "@testing-library/user-event";
import { MobileNavContext, MobileNavDispatchContext } from "./NavContext";

describe("Header component", () => {
  it("should render with the logo and navigation links at larger screen sizes", async () => {
    render(<Header />);
    const logo = await screen.getByRole("link", { name: /lh/i });
    expect(logo).toBeInTheDocument();
  });

  it("should display the full screen height when mobile nav is active", () => {
    const { container } = render(
      <MobileNavContext.Provider value={true}>
        <Header />
      </MobileNavContext.Provider>
    );
    const header = container.querySelector("header");
    expect(header).toHaveClass("h-screen");
  });

  it("should display the auto height when mobile nav is not active", () => {
    const { container } = render(
      <MobileNavContext.Provider value={false}>
        <Header />
      </MobileNavContext.Provider>
    );
    const header = container.querySelector("header");
    expect(header).toHaveClass("h-auto");
  });

  it("should dispatch the event when the logo is clicked", async () => {
    const mockDispatch = jest.fn();
    render(
      <MobileNavContext.Provider value={true}>
        <MobileNavDispatchContext.Provider value={mockDispatch}>
          <Header />
        </MobileNavDispatchContext.Provider>
      </MobileNavContext.Provider>
    );
    const logo = screen.getByTestId("logo");
    expect(logo).toHaveClass("logo");

    await userEvent.click(logo);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should display the inverse logo when the mobile nav is active", () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Header />
      </MobileNavContext.Provider>
    );

    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "/assets/logo-inverse.svg");
    expect(logo).toHaveAttribute("alt", "Logo with initials LH");
  });

  it("should display the main logo when the mobile nav is active", () => {
    render(
      <MobileNavContext.Provider value={false}>
        <Header />
      </MobileNavContext.Provider>
    );

    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "/assets/logo-main.svg");
    expect(logo).toHaveAttribute("alt", "Logo with initials LH");
  });

  it("should display the mobile menu", () => {
    render(
      <MobileNavContext.Provider value={false}>
        <Header />
      </MobileNavContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Toggle mobile menu" });
    expect(button).toBeInTheDocument();
  });

  it("should display the Nav component", () => {
    render(
      <MobileNavContext.Provider value={false}>
        <Header />
      </MobileNavContext.Provider>
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });

  it("should dispatch when the toggleMobileNav is called", async () => {
    const mockDispatch = jest.fn();
    render(
      <MobileNavContext.Provider value={true}>
        <MobileNavDispatchContext.Provider value={mockDispatch}>
          <Header />
        </MobileNavDispatchContext.Provider>
      </MobileNavContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Toggle mobile menu" });

    await userEvent.click(button);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should not throw if dispatch is undefined", async () => {
    render(
      <MobileNavContext.Provider value={true}>
        <MobileNavDispatchContext.Provider value={null}>
          <Header />
        </MobileNavDispatchContext.Provider>
      </MobileNavContext.Provider>
    );

    const logo = screen.getByTestId("logo");
    await userEvent.click(logo); // should not throw
  });
});
