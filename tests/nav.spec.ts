import { test, expect } from "@playwright/test";

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

  for (let item of navItems) {
    const navLink = page.getByRole("link", { name: `${item.text}` });
    await expect(navLink).toBeVisible();
    await navLink.click();

    await expect(page).toHaveURL(`http://localhost:3000${item.url}`);

    // await expect(page).toHaveURL("http://localhost:3000/");
  }
});
