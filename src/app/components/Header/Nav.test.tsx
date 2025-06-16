import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";
import { MobileNavContext } from "./NavContext";

describe("Nav component", () => {
  it("should display the hidden className when mobileNavIsActive is false", async () => {
    const { findByTestId } = render(<Nav />);
    const navWrapper = await findByTestId("nav-items");
    expect(navWrapper).toBeInTheDocument();
    expect(navWrapper).toHaveClass("max-sm:hidden");
  });

  it("should display the h-full class when the mobile nav is active", () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );

    expect(screen.getByRole("navigation")).toHaveClass("h-full");
  });

  it("should not display the hidden className when mobileNavIsActive is true", async () => {
    const { findByTestId } = render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const navWrapper = await findByTestId("nav-items");
    expect(navWrapper).toBeInTheDocument();
    expect(navWrapper).toHaveClass("nav-items w-full overflow-y-auto");
    expect(navWrapper).not.toHaveClass("hidden");
  });

  it("should render the navigation links when mobileNavIsActive is true", async () => {
    const { findByRole } = render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const aboutLink = await findByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });
});
