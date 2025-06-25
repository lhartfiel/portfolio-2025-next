import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";
import { MobileNavContext } from "./NavContext";
import { MobileNavDispatchContext } from "./NavContext";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from "next/navigation";

describe("Nav component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display the hidden className on Nav items div when mobileNavIsActive is false", async () => {
    const { findByTestId } = render(<Nav />);
    const navWrapper = await findByTestId("nav-items");
    expect(navWrapper).toBeInTheDocument();
    expect(navWrapper).toHaveClass("max-sm:hidden");
  });

  it("should display the h-full class on the nav tag when the mobile nav is active", () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );

    expect(screen.getByRole("navigation")).toHaveClass("h-full");
    expect(screen.getByRole("navigation")).not.toHaveClass("h-auto");
  });

  it("should not display the hidden className when mobileNavIsActive is true", async () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const navWrapper = await screen.findByTestId("nav-items");
    expect(navWrapper).toBeInTheDocument();
    expect(navWrapper).toHaveClass("nav-items w-full overflow-y-auto");
    expect(navWrapper).not.toHaveClass("hidden");
  });

  it("should render the navigation links when mobileNavIsActive is true", async () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const aboutLink = await screen.findByRole("link", { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it("should have the href attribute on active page (About) on mobile", async () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const aboutLink = await screen.findByRole("link", { name: /about/i });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("should have text-tertiary on the active page (About) on mobile", async () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const aboutLink = await screen.findByRole("link", { name: /about/i });
    const uxLink = await screen.findByRole("link", { name: /ux/i });
    expect(aboutLink).toHaveClass("text-tertiary");
    expect(uxLink).not.toHaveClass("text-tertiary");
  });

  it("renders arrow icon only on links that are NOT the active page", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const mockDispatch = jest.fn();

    render(
      <MobileNavContext.Provider value={true}>
        <MobileNavDispatchContext.Provider value={mockDispatch}>
          <Nav />
        </MobileNavDispatchContext.Provider>
      </MobileNavContext.Provider>
    );

    const navItemsDiv = screen.getByTestId("nav-items");
    const links = within(navItemsDiv).getAllByRole("link");

    links.forEach((link) => {
      const arrowSpan = within(link).queryByTestId("arrow-icon");

      if (link.getAttribute("href") === "/about") {
        expect(arrowSpan).not.toBeInTheDocument();
      } else {
        expect(arrowSpan).toBeInTheDocument();
        expect(arrowSpan).toHaveClass("inline-block");
      }
    });
  });

  it("should display social links when mobile nav is active", () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const socialLinks = screen.getAllByTestId("social-link");
    socialLinks.forEach((social) => {
      if (social.getAttribute("aria-label") === "LinkedIn") {
        expect(social).toHaveAttribute(
          "href",
          "https://www.linkedin.com/in/lindsayhartfiel/"
        );
      }
    });
  });

  it("should not have target='_blank' for Contact", () => {
    render(
      <MobileNavContext.Provider value={true}>
        <Nav />
      </MobileNavContext.Provider>
    );
    const socialLinks = screen.getAllByRole("link");
    socialLinks.forEach((social) => {
      if (social.getAttribute("aria-label") === "Contact") {
        expect(social).toHaveAttribute("href", "/contact");
        expect(social).not.toHaveAttribute("target", "_blank");
      }
    });
  });

  it("should dispatch when the nav item is clicked if the mobile nav is active", async () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    const mockDispatch = jest.fn();

    render(
      <MobileNavContext.Provider value={true}>
        <MobileNavDispatchContext.Provider value={mockDispatch}>
          <Nav />
        </MobileNavDispatchContext.Provider>
      </MobileNavContext.Provider>
    );
    const uxLink = screen.getByRole("link", { name: "UX" });
    await userEvent.click(uxLink);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
