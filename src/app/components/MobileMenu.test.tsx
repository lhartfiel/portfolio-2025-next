
import { render, fireEvent } from "@testing-library/react";
import MobileMenu from "./MobileMenu";
import { MobileNavContext } from "./NavContext";


describe("MobileMenu component", () => {
  it("should display the hamburger icon when mobileNavIsActive is false", async () => {
    const { getByRole } = render(
      <MobileNavContext.Provider value={false}>
        <MobileMenu toggleMobileNav={() => {}} />
      </MobileNavContext.Provider>
    );
    const hamburgerIcon = getByRole("button");
    expect(hamburgerIcon).toBeInTheDocument();
  });

  it("should call toggleMobileNav when hamburger menu is clicked", () => {
    const toggleMobileNavMock = jest.fn();

    const { getByRole } = render(
      <MobileNavContext.Provider value={false}>
        <MobileMenu toggleMobileNav={toggleMobileNavMock} />
      </MobileNavContext.Provider>
    );

    const hamburgerIcon = getByRole("button");
    fireEvent.click(hamburgerIcon);
  });

  it("should display the X icon when hamburger menu is clicked", async () => {
    const { getByTestId } = render(
      <MobileNavContext.Provider value={true}>
        <MobileMenu toggleMobileNav={() => {}} />
      </MobileNavContext.Provider>
    );
    const hamburgerLineFirst = getByTestId("mobile-line1");
    expect(hamburgerLineFirst).toHaveClass("rotate-45");
  });
});
