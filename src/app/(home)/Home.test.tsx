import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/(home)/page";

describe("Homepage", () => {
  it("should render the homepage", () => {
    const { getByRole } = render(<Home />);
    const heading = getByRole("heading", { name: /home/i });
    expect(heading).toBeInTheDocument();
  });
});
