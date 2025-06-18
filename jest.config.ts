/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  verbose: true,
  clearMocks: true,
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/apis/(.*)$": "<rootDir>/src/api/$1",
    "^@/components/(.*)$": "<rootDir>/src/app/components/$1",
    "^web-streams-polyfill/ponyfill$":
      "<rootDir>/node_modules/web-streams-polyfill/ponyfill.js",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  testPathIgnorePatterns: [
    "<rootDir>/tests/", // Ignore Playwright tests
    "<rootDir>/tests-examples/", // Ignore Playwright tests
  ],
};

// export default config;
export default createJestConfig(config);
