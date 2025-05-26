import { test, expect } from "@playwright/test";
import {
  skillsResponse,
  blogPostsResponse,
  singleBlogPostResponse,
} from "./mocks";

const navItems = [
  { text: "Development", url: "/development" },
  { text: "UX", url: "/ux" },
  { text: "Blog", url: "/blog" },
  { text: "About", url: "/about" },
  { text: "Contact", url: "/contact" },
];

test("should navigate to each nav item page", async ({ page }) => {
  const graphqlMocks = {
    allSkills: { data: { allSkills: skillsResponse.data } },
    allBlogs: { data: { allBlogs: blogPostsResponse.data } },
    blogBySlug: { data: { blogBySlug: singleBlogPostResponse.data } },
  };

  await page.route("**/graphql", async (route, request) => {
    console.log("GraphQL request intercepted");
    const postData = request.postDataJSON();
    const query = postData.query;

    console.log("query", query);

    try {
      for (const key of Object.keys(graphqlMocks)) {
        if (query.includes(key)) {
          console.log(`✅ Mocking response for: ${key}`);
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(graphqlMocks[key]),
          });
        }
      }

      console.warn("⚠️ No matching mock for query:", query);
      await route.continue();
    } catch (err) {
      console.error("❌ Failed to parse postData JSON", err);
      await route.continue();
    }
  });

  await page.goto("http://localhost:3000/");
  await page.waitForURL("http://localhost:3000/");

  for (let item of navItems) {
    const navLink = page.getByRole("link", {
      name: `${item.text}`,
      exact: true,
    });
    await expect(navLink).toBeVisible();

    await page.goto("http://localhost:3000/");

    await navLink.click();

    await expect(page).toHaveURL(`http://localhost:3000${item.url}`);

    await page.waitForSelector("h1", { timeout: 60000 });
  }
});
