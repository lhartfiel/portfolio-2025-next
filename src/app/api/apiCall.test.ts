import apiCall from "./apiCall";
import { getClient } from "../ApolloClient";
import { ApolloError } from "@apollo/client";
import { gql } from "@apollo/client";

jest.mock("../ApolloClient");

const TEST_QUERY = gql`
  query TestQuery {
    test {
      title
    }
  }
`;

describe("API calls", () => {
  let queryMock: jest.Mock;

  beforeEach(() => {
    queryMock = jest.fn();
    (getClient as jest.Mock).mockReturnValue({
      query: queryMock,
    });
  });

  it("should return a successful response", async () => {
    queryMock.mockResolvedValueOnce({
      data: { test: [{ title: "Test" }] },
    });

    const result = await apiCall(TEST_QUERY, "test");
    expect(result).toEqual([{ title: "Test" }]);
    expect(queryMock).toHaveBeenCalledWith({ query: TEST_QUERY });
  });

  it("should return null on ApolloError", async () => {
    queryMock.mockRejectedValueOnce(
      new ApolloError({
        errorMessage: "Something went wrong",
        graphQLErrors: [],
      })
    );

    const result = await await apiCall(TEST_QUERY, "test");
    expect(result).toBeNull();
  });
  it("should return null on generic Error", async () => {
    queryMock.mockRejectedValueOnce(new Error("Unknown error"));

    const result = await await apiCall(TEST_QUERY, "test");
    expect(result).toBeNull();
  });
});
