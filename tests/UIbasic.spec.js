const {test,expect}=require('@playwright/test');
const { assert } = require('console');
const { only } = require('node:test');



test('Browser context playwright',async({browser})=>
{
    const context= await browser.newContext();
    const page=await context.newPage();
    
    const userName=page.locator('input#username');
    const password=page.locator("[id='password']");
    const signIn=page.locator("#signInBtn");
    const cardTitles=page.locator(".card-title a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('input#username').fill("rahulshetty");
    await page.locator("[id='password']").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    //console.log(await page.locator(".card-title a").nth(0).textContent());
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);

});


test('register client',async({browser})=>
{
    const context = await browser.newContext();
    const page =await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("deep.netherland@gmail.com");
    await page.locator("#userPassword").fill("mM*9859485878");
    await page.locator("#login").click();
    //await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    const allElementonCart=await page.locator(".card-body b").allTextContents();
    console.log(allElementonCart);
});


test("UI Controls",async({browser})=>
{
  
const context=await browser.newContext();
const page= await context.newPage();
const blinkingAtrribute=page.locator("[href*=documents-request]");


await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName=page.locator("#username");
const password=page.locator("#password");
const userDropdown=page.locator("select.form-control");
await userDropdown.selectOption("consult");

await  page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
await expect(page.locator(".radiotextsty").last()).toBeChecked();

await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();

await expect(blinkingAtrribute).toHaveAttribute("class","blinkingText");
});


test("Child window page",async({browser})=>
{
const context=await browser.newContext();
const page=await context.newPage();
const blinkingAtrribute=page.locator("[href*=documents-request]");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const [newPage]=await Promise.all(
[
    context.waitForEvent('page'),
    blinkingAtrribute.click()

]);

const text=await newPage.locator(".red").textContent();
const textArray=text.split("@");
console.log(textArray)
const domain=textArray[1].split(" ");
console.log(domain[0]);


});