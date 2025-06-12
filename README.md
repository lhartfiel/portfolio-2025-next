## About

This is my latest portfolio site using NextJS to display both my frontend development and UX design skills.

## Tech

- NextJS
- Typescript
- Tailwind
- GraphQL
- Node > 18

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

If you encounter any issues with node, ensure you are running Node > 18. Run `nvm use` to ensure you local node runs the correct version.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Testing

- Jest - unit tests
  - Jest tests are located in the same directory as the component they are testing
  - To run tests: `npm run test` or `npm run test:watch`
- Playwright - end-to-end tests

  - Tests are located in the `tests` directory
  - To run playwright tests:
    - Run the end-to-end tests: `npx playwright test`
    - Start the interactive UI mode: `npx playwright test --ui`
    - Run in headed mode: `npx playwright test --headed`
    - Run the tests only on Desktop Chrome: `npx playwright test --project=chromium`
    - Run the tests in a specific file: `npx playwright test example`
    - Run the tests in debug mode: `npx playwright test --debug`
    - Auto generate tests with Codegen: `npx playwright codegen`

## Why Next

This is a fairly simple portfolio site that fetches content from graphQL. So why Next.js? Next is one of the frameworks recommended on the React website as a full-stack solution. It provides server-side rendering, which is ideal for quick data fetching, but can also be integrated with client-side components.

Next also offers an incredibly intuitive routing structure that is based on directory paths and enables dymnamic routes, which I used for blog posts and UX projects.
