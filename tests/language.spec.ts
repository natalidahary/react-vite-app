import { test, expect } from "@playwright/test";

test("language switch changes direction", async ({ page }) => {
  await page.goto("/");

  const nav = page.locator(".app-nav");

  await nav.getByRole("button", { name: "HE", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await nav.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});
