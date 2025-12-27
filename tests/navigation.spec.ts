import { test, expect } from "@playwright/test";

test("navigate to products page", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: /products/i }).click();

  await expect(page).toHaveURL(/products/);

  // Stable assertion: PrimeReact table exists
  await expect(page.locator(".p-datatable")).toBeVisible();
});
