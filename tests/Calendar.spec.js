const { test, expect } = require("@playwright/test");

test("Calendar validation", async ({ page }) => {
  const month = "3";
  const date = "27";
  const year = "2025";

  const dateArray = [month, date, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(month) - 1)
    .click();
  await page
    .locator("//abbr[text()='" + date + "']")
    .nth(1)
    .click();

  const dateSelected = await page.locator(
    ".react-date-picker__inputGroup__input"
  );

  for (let i = 0; i < (await dateSelected.count()); i++) {
    const value = await dateSelected.nth(i).getAttribute("value");
    expect(value).toEqual(dateArray[i]);
  }
});
