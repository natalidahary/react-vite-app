import { test, expect } from "@playwright/test";

test("pagination changes page", async ({ page }) => {
  await page.goto("/products");

  const firstRow = page.locator("tbody tr").first();
  const firstRowText = await firstRow.textContent();

  await page.getByRole("button", { name: "2" }).click();

  await expect(firstRow).not.toHaveText(firstRowText!);
});
