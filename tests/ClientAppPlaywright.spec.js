const {test, expect}=require("@playwright/test");


test("client app login using playwright methods",async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button",{name:"Login"}).click();

    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").getByText("ZARA COAT").waitFor();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();
    await page.locator("li").getByRole("button",{name:"Cart"}).click();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:"Buy Now"}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

})


