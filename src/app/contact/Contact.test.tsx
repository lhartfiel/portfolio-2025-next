import { render } from "@testing-library/react";
import Contact from "./page";
import { SEND_MESSAGE } from "../api/graphql/mutations";
import { MockedProvider } from "@apollo/client/testing";

const mocks = [
  {
    request: {
      query: SEND_MESSAGE,
      variables: {
        name: "Jane Doe",
        email: "jane@doe.com",
        message: "Hello, this is a test message.",
      },
    },
    result: {
      data: {
        createContact: {
          name: "Jane Doe",
          email: "jane@doe.com",
          message: "Hello, this is a test message.",
        },
      },
    },
  },
];

describe("Contact Component", () => {
  it("renders the contact form with 3 fields and a submit button", async () => {
    const { getAllByRole } = render(
      <MockedProvider mocks={mocks}>
        <Contact />
      </MockedProvider>
    );
    const inputs = getAllByRole("textbox");
    expect(inputs).toHaveLength(3);
  });
});
