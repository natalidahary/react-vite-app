import { test, expect } from "@playwright/test";

test("form shows onBlur errors and enables submit when valid", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("lang", "en");
  });
  await page.goto("/");

  await expect(page.locator(".form-card")).toBeVisible();
  const submitButton = page.locator(".form-submit");
  await expect(submitButton).toBeDisabled();

  const firstName = page.getByLabel("First name");
  await firstName.focus();
  await page.getByLabel("Last name").click();
  await expect(page.getByText("First name is required")).toBeVisible();
  await expect(firstName).toHaveAttribute("aria-invalid", "true");

  const fillTextAndBlur = async (label: string, value: string) => {
    const field = page.getByRole("textbox", { name: label, exact: true });
    await field.fill(value);
    await field.blur();
  };

  const fillNumberAndBlur = async (label: string, value: string) => {
    const field = page.getByRole("spinbutton", { name: label, exact: true });
    await field.fill(value);
    await field.blur();
  };

  await fillTextAndBlur("First name", "Natali");
  await fillTextAndBlur("Last name", "Dahary");
  await fillTextAndBlur("Email", "natali@example.com");
  await fillTextAndBlur("Phone", "+972526555231");
  await fillTextAndBlur("Password", "Password1");
  await fillTextAndBlur("Confirm password", "Password1");
  await fillNumberAndBlur("Age", "30");
  await fillTextAndBlur("Date of birth", "1995-02-18");
  await fillTextAndBlur("Portfolio URL", "https://example.com");

  const country = page.getByLabel("Country");
  await country.selectOption("israel");
  await country.blur();

  const role = page.getByLabel("Primary role");
  await role.selectOption("developer");
  await role.blur();

  const contactMethod = page.getByRole("radio", { name: "Email" });
  await contactMethod.check();
  await contactMethod.blur();

  const experience = page.getByLabel(/experience level/i);
  await experience.fill("7");
  await experience.blur();

  await fillTextAndBlur(
    "Short bio",
    "I love building thoughtful user experiences."
  );

  const terms = page.getByRole("checkbox", { name: /terms and conditions/i });
  await terms.check();
  await terms.blur();

  await expect(submitButton).toBeEnabled();

  const cached = await page.evaluate(() =>
    localStorage.getItem("homework-form-cache")
  );
  expect(cached).not.toBeNull();
  expect(cached ?? "").not.toContain("password");
});
