## About

This is a my latest portfolio site using NextJS to display both my frontend development and UX design skills.

## Tech

- NextJS
- Tailwind
- GraphQL

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

- Jest - unit tests
  - Jest tests are located in the same directory as the component they are testing
  - To run tests: `npm run test` or `npm run test:watch`
- Playwright - end-to-end tests

  - Tests are located in the `tests` directory
  - To run playwright tests:
    - Run the end-to-end tests: `npx playwright test`
    - Start the interactive UI mode: `npx playwright test --ui`
    - Run the tests only on Desktop Chrome: `npx playwright test --project=chromium`
    - Run the tests in a specific file: `npx playwright test example`
    - Run the tests in debug mode: `npx playwright test --debug`
    - Auto generate tests with Codegen: `npx playwright codegen`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
