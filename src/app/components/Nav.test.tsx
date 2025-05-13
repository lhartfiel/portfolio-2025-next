import { render, screen } from "@testing-library/react";
import Nav from "./Nav";

describe("Nav component", () => {
  it("should display the hidden className when mobileNavIsActive is false", async () => {
    const { findByTestId } = render(<Nav mobileNavIsActive={false} />);
    const navWrapper = await findByTestId("nav-items");
    expect(navWrapper).toBeInTheDocument();
    expect(navWrapper).toHaveClass("max-sm:hidden");
  });

  it("should not display the hidden className when mobileNavIsActive is true", async () => {
    const { findByTestId } = render(<Nav mobileNavIsActive={true} />);
    const navWrapper = await findByTestId("nav-items");
    expect(navWrapper).toBeInTheDocument();
    expect(navWrapper).toHaveClass("flex flex-wrap ml-0");
    expect(navWrapper).not.toHaveClass("hidden");
  });

  it("should render the navigation links when mobileNavIsActive is true", async () => {
    const { findByRole } = render(<Nav mobileNavIsActive={true} />);
    const aboutLink = await findByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });
});
