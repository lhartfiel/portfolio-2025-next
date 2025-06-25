import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./page";
import { SEND_MESSAGE } from "../api/graphql/mutations";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { ServerError } from "@apollo/client";

const fillAndSubmitForm = async () => {
  await userEvent.type(screen.getByLabelText(/name/i), "Jane Doe");
  await userEvent.type(screen.getByLabelText(/email/i), "jane@doe.com");
  await userEvent.type(
    screen.getByLabelText(/message/i),
    "Hello, this is a test message."
  );
  const button = screen.getByRole("button", { name: /send/i });
  await userEvent.click(button);
};

interface RenderContactProps {
  mocks: readonly MockedResponse[];
}

const renderContact = (mocks: RenderContactProps["mocks"]): void => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Contact />
    </MockedProvider>
  );
};

const emptyOnCompleteMock = [
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
          ok: false,
          contact: null,
        },
      },
    },
  },
];

const successMocks = [
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
          ok: true,
          contact: {
            name: "Jane Doe",
            email: "jane@doe.com",
            message: "Hello, this is a test message.",
          },
        },
      },
    },
    delay: 50, // Add a delay to test the loading state
  },
];

const graphQLErrorMocks = [
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
      errors: [
        new GraphQLError("Error sending message. Please check your input"),
      ],
    },
  },
];

const networkErrorMocks = [
  {
    request: {
      query: SEND_MESSAGE,
      variables: {
        name: "Jane Doe",
        email: "jane@doe.com",
        message: "Hello, this is a test message.",
      },
    },
    error: {
      name: "ServerError",
      message: "Failed to connect to the server",
      response: {},
      statusCode: 500,
    } as ServerError,
  },
];

const fallbackErrorMock = [
  {
    request: {
      query: SEND_MESSAGE,
      variables: {
        name: "Jane Doe",
        email: "jane@doe.com",
        message: "Hello, this is a test message.",
      },
    },
    error: new Error(),
    delay: 100,
  },
];

describe("Contact Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the contact form with 3 fields and a submit button", async () => {
    renderContact(successMocks);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(3);
  });

  it("displays the h1 heading", () => {
    renderContact(successMocks);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Say Hey!"
    );
  });

  it("displays the Loading message when the form is submitted", async () => {
    renderContact(successMocks);
    await fillAndSubmitForm();

    const loading = await screen.findByTestId("loading");
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent(/Loading.../i);
  });

  it("should show a disabled button with gray background when the form is not filled out", async () => {
    renderContact(successMocks);
    const button = screen.getByRole("button", { name: /send/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out inline-block false bg-portfolio-gray cursor-not-allowed text-black"
    );
  });

  it("should enable the button when all fields are filled out", async () => {
    render(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <Contact />
      </MockedProvider>
    );

    const button = screen.getByRole("button", { name: /send/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out inline-block false bg-portfolio-gray cursor-not-allowed text-black"
    );

    await userEvent.type(screen.getByLabelText(/name/i), "Jane Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "jane@doe.com");
    await userEvent.type(
      screen.getByLabelText(/message/i),
      "Hello, this is a test message."
    );

    await waitFor(() => {
      const updatedButton = screen.getByRole("button", { name: /send/i });
      expect(updatedButton).not.toBeDisabled();
      expect(updatedButton).toHaveClass(
        "relative inline-block font-kanit font-bold justify-center rounded-[20px] transition duration-300 ease-in-out bg-accent border-1 border-accent text-black"
      );
    });
  });
});
describe("Contact component - error messages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should display an error message when the response is false and there are graphQL errors", async () => {
    renderContact(graphQLErrorMocks);
    await fillAndSubmitForm();

    const submissionMessage = await screen.findByTestId("submission-message");
    expect(submissionMessage).toBeInTheDocument();
    expect(submissionMessage).toHaveTextContent(
      "Error sending message. Error sending message. Please check your input."
    );
  });

  it("should display an error message when the response is false and there is a network error", async () => {
    renderContact(networkErrorMocks);
    await fillAndSubmitForm();

    const submissionMessage = await screen.findByTestId("submission-message");
    expect(submissionMessage).toBeInTheDocument();
    expect(submissionMessage).toHaveTextContent(
      "Error sending message. Failed to connect to the server."
    );
  });

  it("should display the generic error message when the response is false, there are no graphQL errors and no network error", async () => {
    renderContact(fallbackErrorMock);
    await fillAndSubmitForm();

    const submissionMessage = await screen.findByTestId("submission-message");
    expect(submissionMessage).toBeInTheDocument();
    expect(submissionMessage).toHaveTextContent(
      "Error sending message. Please try again."
    );
  });

  it("should display error message for onCompleted", async () => {
    renderContact(emptyOnCompleteMock);
    await fillAndSubmitForm();

    const submissionMessage = await screen.findByTestId("submission-message");
    expect(submissionMessage).toBeInTheDocument();
    expect(submissionMessage).toHaveTextContent(
      "Error sending message. Please check your input."
    );
  });
});
