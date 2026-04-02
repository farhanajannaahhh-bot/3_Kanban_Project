import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with 5 columns and dummy cards", async ({ page }) => {
    const columns = page.locator(".flex.gap-5 > div");
    await expect(columns).toHaveCount(5);

    // Each column should have at least one card
    const cards = page.locator("[data-testid='kanban-card']");
    await expect(cards).toHaveCount(await cards.count());
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("rename a column", async ({ page }) => {
    // Click the first column name to start rename
    await page.getByRole("button", { name: /rename column backlog/i }).click();
    const input = page.getByRole("textbox", { name: /rename column/i });
    await input.selectText();
    await input.fill("Sprint 1");
    await input.press("Enter");
    await expect(page.getByRole("button", { name: /rename column sprint 1/i })).toBeVisible();
  });

  test("add a card to a column", async ({ page }) => {
    // Count cards in first column before
    const firstColCards = page.locator(".flex.gap-5 > div").first().locator("[data-testid='kanban-card']");
    const before = await firstColCards.count();

    // Click "Add card" in first column
    await page.locator(".flex.gap-5 > div").first().getByText("+ Add card").click();

    // Fill in modal
    await page.getByPlaceholder("Card title").fill("New E2E Card");
    await page.getByPlaceholder("Add a description...").fill("Created by Playwright");
    await page.getByRole("button", { name: "Add card", exact: true }).click();

    await expect(firstColCards).toHaveCount(before + 1);
    await expect(page.getByText("New E2E Card")).toBeVisible();
  });

  test("delete a card", async ({ page }) => {
    const firstColCards = page.locator(".flex.gap-5 > div").first().locator("[data-testid='kanban-card']");
    const before = await firstColCards.count();

    // Hover the first card to reveal the delete button
    const firstCard = firstColCards.first();
    await firstCard.hover();
    await firstCard.getByRole("button", { name: /delete card/i }).click();

    await expect(firstColCards).toHaveCount(before - 1);
  });

  test("drag card from one column to another", async ({ page }) => {
    const columns = page.locator(".flex.gap-5 > div");
    const srcCol = columns.nth(0);
    const destCol = columns.nth(1);

    const srcCards = srcCol.locator("[data-testid='kanban-card']");
    const destCards = destCol.locator("[data-testid='kanban-card']");

    const srcBefore = await srcCards.count();
    const destBefore = await destCards.count();

    // Get the first card text so we can verify it moved
    const cardTitle = await srcCards.first().locator("span").first().textContent();

    // Drag using bounding boxes
    const dragSource = await srcCards.first().boundingBox();
    const dropTarget = await destCol.boundingBox();
    if (!dragSource || !dropTarget) throw new Error("Could not get bounding boxes");

    await page.mouse.move(dragSource.x + dragSource.width / 2, dragSource.y + dragSource.height / 2);
    await page.mouse.down();
    await page.mouse.move(dropTarget.x + dropTarget.width / 2, dropTarget.y + 60, { steps: 20 });
    await page.mouse.up();

    await expect(srcCards).toHaveCount(srcBefore - 1);
    await expect(destCards).toHaveCount(destBefore + 1);
    await expect(destCol.getByText(cardTitle!.trim())).toBeVisible();
  });
});
