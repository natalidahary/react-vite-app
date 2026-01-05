import { test, expect } from "@playwright/test";

test("products table is rendered", async ({ page }) => {
  await page.goto("/products");

  const table = page.locator(".p-datatable");
  await expect(table).toBeVisible();

  const rows = table.locator("tbody tr");
  await expect(await rows.count()).toBeGreaterThan(0);
});
