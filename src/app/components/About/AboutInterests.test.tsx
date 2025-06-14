import { render, waitFor, screen, within } from "@testing-library/react";
import { AboutInterests } from "./AboutInterests";
import userEvent from "@testing-library/user-event";

const interests = [
  {
    name: "Reading",
    icon: "faBookOpenReader",
    heading: "Reading Time",
    description:
      "Cookie candy canes chocolate icing lollipop halvah dragée. Sweet bonbon sugar plum marzipan toffee. Gummi bears dragée chocolate cake sesame snaps candy canes candy canes bonbon chupa chups.",
  },
  {
    name: "Writing",
    icon: "faPen",
    heading: "Writing Time",
    description:
      "Gummies tiramisu bear claw icing gummi bears powder sweet roll. Carrot cake lollipop pudding pastry marshmallow gingerbread. Bonbon jujubes lemon drops pastry candy canes jujubes. Cupcake lollipop apple pie jujubes pudding candy canes soufflé cheesecake oat cake. Bonbon brownie bear claw carrot cake wafer muffin gingerbread. Sesame snaps pie chupa chups pie cotton candy icing pastry sweet bonbon. Croissant bonbon gummi bears soufflé chupa chups marshmallow. Ice cream jelly oat cake gummies dessert jelly beans donut cake apple pie. Dessert candy canes marshmallow bonbon croissant. Danish cheesecake sweet roll marshmallow jelly beans gingerbread. Macaroon tiramisu brownie biscuit chocolate bar jujubes. Chocolate cake oat cake icing topping biscuit marzipan. Icing candy canes marzipan bonbon chocolate bar. Brownie tootsie roll caramels pudding icing.",
  },
  {
    name: "Hiking",
    icon: "faPersonHiking",
    heading: "Hiking Time",
    description:
      "Carrot cake carrot cake jujubes gummies ice cream danish apple pie cake.",
  },
];

describe("AboutInterests component", () => {
  it("should display correct number of interests", () => {
    render(<AboutInterests interests={interests} />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(interests.length);
  });

  it("should display an icon if matches imported icons", () => {
    const { getAllByTestId } = render(<AboutInterests interests={interests} />);
    const icons = getAllByTestId("interest-icon");
    expect(icons).toHaveLength(1);
  });

  it("should display the correct heading", () => {
    const { getAllByRole } = render(<AboutInterests interests={interests} />);
    const interestHeadings = getAllByRole("heading");
    interests.forEach((interest, idx) => {
      expect(interestHeadings[idx]).toHaveTextContent(interest.heading);
    });
  });

  it("should expand the description if Read More button and it is clicked", async () => {
    const { getAllByTestId } = render(<AboutInterests interests={interests} />);
    const interestBlocks = getAllByTestId("interest-block");
    expect(interestBlocks).toHaveLength(interests.length);

    for (let idx = 0; idx < interests.length; idx++) {
      const block = interestBlocks[idx];
      const interest = interests[idx];
      const truncatedText = interest.description.slice(0, 245);
      const utils = within(block);
      const desc = utils.getByTestId("about-description");

      if (interest.description.length <= 245) {
        expect(utils.queryByText("Read More")).toBeNull();
        expect(desc).toHaveTextContent(interest.description);
      } else {
        expect(desc).toHaveTextContent(truncatedText);
        const button = utils.getByText("Read More");

        await userEvent.click(button);
        await waitFor(() => {
          expect(desc).toHaveTextContent(interest.description);
        });

        const readLessButton = utils.getByText("Read Less");

        await userEvent.click(readLessButton);
        await waitFor(() => {
          expect(desc).toHaveTextContent(truncatedText);
        });
      }
    }
  });
});
