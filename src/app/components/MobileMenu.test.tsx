import { render, waitFor, fireEvent } from "@testing-library/react";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

const MobileMenuTestWrapper = () => {
  const [mobileNavIsActive, setMobileNavIsActive] = useState(false);

  return (
    <MobileMenu
      mobileNavIsActive={mobileNavIsActive}
      toggleMobileNav={() => setMobileNavIsActive((prev) => !prev)}
    />
  );
};

describe("MobileMenu component", () => {
  it("should display the hamburger icon when mobileNavIsActive is false", async () => {
    const { getByRole } = render(
      <MobileMenu mobileNavIsActive={false} toggleMobileNav={() => {}} />
    );
    const hamburgerIcon = getByRole("button");
    expect(hamburgerIcon).toBeInTheDocument();
  });

  it("should display the X icon when hamburger menu is clicked", async () => {
    const { getByRole, getByTestId } = render(<MobileMenuTestWrapper />);
    const hamburgerIcon = getByRole("button");
    fireEvent.click(hamburgerIcon);
    await waitFor(() => {
      const hamburgerLineFirst = getByTestId("mobile-line1");
      expect(hamburgerLineFirst).toHaveClass("rotate-45");
    });
  });
});
