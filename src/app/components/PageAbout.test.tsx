import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageAbout } from "./PageAbout";

const aboutPropHeading = "About Me";
const aboutPropDescription = "<p>This is a description about me.</p>";
const truncatePropLength = 50;

describe("PageAbout Component", () => {
  it("should display the h2 heading if it is provided", () => {
    render(
      <PageAbout
        aboutHeading={aboutPropHeading}
        aboutDescription={aboutPropDescription}
        truncateLength={truncatePropLength}
      />
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      aboutPropHeading
    );
  });

  it("should not display the h2 heading when there is no aboutHeading", () => {
    render(
      <PageAbout
        aboutDescription={aboutPropDescription}
        truncateLength={truncatePropLength}
      />
    );
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("should display the description without the Read More button when the text is less than the truncate length", () => {
    render(
      <PageAbout
        aboutDescription={aboutPropDescription}
        truncateLength={truncatePropLength}
      />
    );
    expect(screen.getByTestId("description")).toHaveTextContent(
      "This is a description about me."
    );
  });

  it("should display the full description without Reace More when the screenSize is true", () => {
    render(
      <PageAbout
        aboutDescription={aboutPropDescription}
        truncateLength={truncatePropLength}
        screenSize={true}
      />
    );
    expect(screen.getByTestId("description")).toHaveTextContent(
      "This is a description about me."
    );
    expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
  });

  it("should display the truncated description when greater than truncateLength and show the Read More button", () => {
    const updatedPropDescription =
      "<p>This is a very long description about me that exceeds the truncate length of 50 characters and it should be truncated.</p>";
    render(
      <PageAbout
        aboutDescription={updatedPropDescription}
        truncateLength={truncatePropLength}
      />
    );
    expect(screen.getByText(/Read More/i)).toBeInTheDocument();
    expect(screen.getByTestId("description")).not.toHaveTextContent(
      /it should be truncated/i
    );
  });

  it("should not display the Read More button when description is less than truncateLength", () => {
    render(
      <PageAbout
        aboutDescription={aboutPropDescription}
        truncateLength={truncatePropLength}
      />
    );
    expect(screen.queryByText(/Read More/i)).not.toBeInTheDocument();
    expect(screen.getByTestId("description")).toHaveTextContent(
      /This is a description about me./i
    );
  });

  it("should display the Read Less text when button is clicked", async () => {
    const updatedPropDescription =
      "<p>This is a very long description about me that exceeds the truncate length of 50 characters and it should be truncated.</p>";
    render(
      <PageAbout
        aboutDescription={updatedPropDescription}
        truncateLength={truncatePropLength}
      />
    );
    const readMoreButton = screen.getByText(/Read More/i);
    expect(readMoreButton).toBeInTheDocument();

    await userEvent.click(readMoreButton);

    const readLessButton = screen.getByText(/Read Less/i);
    expect(readLessButton).toBeInTheDocument();
    expect(screen.getByTestId("description")).toHaveTextContent(
      /it should be truncated/i
    );

    await userEvent.click(readLessButton);

    expect(readMoreButton).toBeInTheDocument();
  });
});
