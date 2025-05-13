import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("should render with the logo and navigation links at larger screen sizes", async () => {
    const { getByRole } = render(<Header />);
    const logo = await getByRole("link", { name: /lh/i });
    expect(logo).toBeInTheDocument();
  });
});
