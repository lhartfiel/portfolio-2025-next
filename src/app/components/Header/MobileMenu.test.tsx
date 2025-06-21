import { render, screen } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";
import userEvent from "@testing-library/user-event";
import { MobileNavContext } from "./NavContext";

describe("MobileMenu component", () => {
  it("should render the hamburger Button when mobileNavIsActive is false", async () => {
    render(
      <MobileNavContext.Provider value={false}>
        <MobileMenu toggleMobileNav={() => {}} />
      </MobileNavContext.Provider>
    );
    const hamburgerIcon = screen.getByRole("button");
    expect(hamburgerIcon).toBeInTheDocument();
    expect(hamburgerIcon).toHaveAttribute("aria-label", "Toggle mobile menu");
  });

  it("should call toggleMobileNav when hamburger menu is clicked", async () => {
    const toggleMobileNavMock = jest.fn();

    render(
      <MobileNavContext.Provider value={false}>
        <MobileMenu toggleMobileNav={toggleMobileNavMock} />
      </MobileNavContext.Provider>
    );

    const hamburgerIcon = screen.getByRole("button");
    await userEvent.click(hamburgerIcon);
    expect(toggleMobileNavMock).toHaveBeenCalledTimes(1);
  });

  it("should display the X icon when hamburger menu is clicked", async () => {
    const { container } = render(
      <MobileNavContext.Provider value={true}>
        <MobileMenu toggleMobileNav={() => {}} />
      </MobileNavContext.Provider>
    );
    const hamburgerLineFirst = container.querySelectorAll(".line")[0];
    expect(hamburgerLineFirst).toHaveClass("rotate-45");

    const hamburgerMiddleLine = container.querySelectorAll(".line")[1];
    expect(hamburgerMiddleLine).toHaveClass("w-0");

    const hamburgerLastLine = container.querySelectorAll(".line")[2];
    expect(hamburgerLastLine).toHaveClass("-rotate-45");
  });

  it("should display the correct hamburger menu classes when the mobile nav is not active", () => {
    const { container } = render(
      <MobileNavContext.Provider value={false}>
        <MobileMenu toggleMobileNav={() => {}} />
      </MobileNavContext.Provider>
    );
    const hamburgerLineFirst = container.querySelectorAll(".line")[0];
    expect(hamburgerLineFirst).toHaveClass("top-0");

    const hamburgerMiddleLine = container.querySelectorAll(".line")[1];
    expect(hamburgerMiddleLine).toHaveClass("top-2");

    const hamburgerLastLine = container.querySelectorAll(".line")[2];
    expect(hamburgerLastLine).toHaveClass("top-4");
  });
});
