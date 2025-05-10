import { test, expect } from "@playwright/test";
import {
  skillsResponse,
  blogPostsResponse,
  singleBlogPostResponse,
} from "./mocks";

const navItems = [
  { text: "Home", url: "/" },
  { text: "About", url: "/about" },
  { text: "Development", url: "/development" },
  { text: "UX", url: "/ux" },
  { text: "Blog", url: "/blog" },
  { text: "Contact", url: "/contact" },
];

test("should navigate to each nav item page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const graphqlMocks = {
    skills: { data: { skills: skillsResponse.data } },
    blogPosts: { data: { blogPosts: blogPostsResponse.data } },
    blog: { data: { blog: singleBlogPostResponse.data } },
  };

  await page.route("**/graphql", async (route, request) => {
    const postData = request.postDataJSON();
    const query = postData.query;

    for (const key of Object.keys(graphqlMocks)) {
      if (query.includes(key)) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(graphqlMocks[key]),
        });
      }
    }
    route.continue();
  });

  for (let item of navItems) {
    const home = page.getByRole("link", { name: /home/i });
    const navLink = page.getByRole("link", { name: `${item.text}` });
    await expect(navLink).toBeVisible();

    await navLink.click();

    await expect(page).toHaveURL(`http://localhost:3000${item.url}`);

    await page.waitForSelector("h1");

    await home.click();
    await expect(page).toHaveURL("http://localhost:3000/");
  }
});
