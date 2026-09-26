import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("homepage critical path", () => {
  test("hero, generator input, and copy control", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /fancy text generator/i })).toBeVisible();

    const textarea = page.getByLabel("Your text");
    await textarea.fill("audit");
    await expect(textarea).toHaveValue("audit");

    const copyButton = page.getByRole("button", { name: /copy/i }).first();
    await expect(copyButton).toBeEnabled();
  });

  test("accessibility smoke (axe)", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});
