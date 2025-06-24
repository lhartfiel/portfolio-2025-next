import { render, screen } from "@testing-library/react";
import {
  MobileNavContext,
  MobileNavDispatchContext,
  MobileNavProvider,
} from "./NavContext";
import { useContext } from "react";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
  const mobileNavIsActive = useContext(MobileNavContext);
  const toggle = useContext(MobileNavDispatchContext);
  return (
    <>
      <div data-testid="value">
        {mobileNavIsActive ? "Mobile Nav Active" : "Mobile Nav Inactive"}
      </div>
      <button onClick={toggle!}>Toggle Nav</button>
    </>
  );
};

describe("NavContext", () => {
  it("initially provides false and then toggles to true when button is clicked", async () => {
    render(
      <MobileNavProvider>
        <TestComponent />
      </MobileNavProvider>
    );
    const status = screen.getByTestId("value");
    expect(status).toHaveTextContent("Mobile Nav Inactive");

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(status).toHaveTextContent("Mobile Nav Active");
  });
});
