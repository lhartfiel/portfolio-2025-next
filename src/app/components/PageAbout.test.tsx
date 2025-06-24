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

  it("should use the default truncate number if none is provided", () => {
    const longDescription =
      "Sweet sesame snaps cheesecake toffee tootsie roll jelly beans cookie. Fruitcake chocolate bar dragée sugar plum jelly-o jelly-o muffin chocolate. Chupa chups liquorice apple pie chocolate bar bear claw. Lemon drops tiramisu pudding jelly-o gingerbread croissant chupa chups. Cake dessert sweet roll toffee macaroon croissant jelly beans fruitcake tootsie roll. Wafer cake brownie tart chocolate bar cake jelly beans. Cookie muffin gummies chupa chups gummi bears. Soufflé fruitcake cookie chupa chups candy canes cake jelly shortbread. Soufflé jelly sweet lemon drops marshmallow icing gummi bears tart. Jelly-o caramels pie gummies jelly danish candy sweet roll. Ice cream caramels lemon drops toffee bear claw toffee jelly cake. Gummi bears caramels marzipan caramels macaroon macaroon sweet roll sweet roll. Bear claw jelly fruitcake chocolate bar tiramisu sesame snaps. Jelly beans jelly-o tiramisu tart cake. Icing marshmallow ice cream powder cookie gummi bears muffin chocolate cake danish. Muffin bear claw croissant chocolate cake croissant oat cake oat cake bonbon. Bear claw pastry pastry apple pie chupa chups lemon drops icing cotton candy ice cream. Jelly chocolate cake chupa chups tiramisu bear claw chocolate jelly. Icing fruitcake carrot cake tart jujubes. Halvah tootsie roll cake gingerbread candy bonbon cookie. Icing pastry gingerbread gummies cotton candy tiramisu. Chocolate bar sweet caramels tart ice cream. Lemon drops toffee liquorice wafer jujubes. Fruitcake cotton candy croissant tootsie roll sugar plum ice cream bonbon. Macaroon muffin lollipop cheesecake cake lemon drops. Cookie chupa chups bear claw bonbon sesame snaps cake soufflé. Cookie danish pastry macaroon dragée jelly beans dessert carrot cake.";
    render(<PageAbout aboutDescription={longDescription} />);
    expect(screen.getByTestId("description")).not.toHaveTextContent(
      "beans dessert carrot cake."
    );
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
