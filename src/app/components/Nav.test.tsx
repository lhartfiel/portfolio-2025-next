import { render } from "@testing-library/react";
import Nav from "./Nav";

describe("Nav component", () => {
  it("should render the navigation links", async () => {
    const { findByRole } = render(<Nav />);
    const homeLink = await findByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });
});
