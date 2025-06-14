import "@testing-library/jest-dom";
import "@/src/styles/globals.css";
import { TransformStream } from "web-streams-polyfill";
if (typeof global.TransformStream === "undefined") {
  global.TransformStream = TransformStream;
}

process.env.NEXT_PUBLIC_IMAGE_PATH = "http://localhost:3000/";

jest.mock("@apollo/client-integration-nextjs", () => ({
  registerApolloClient: jest.fn(() => ({
    getClient: jest.fn(),
    query: jest.fn(),
    PreloadQuery: jest.fn(),
  })),
}));
