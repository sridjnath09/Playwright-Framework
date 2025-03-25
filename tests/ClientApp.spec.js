const {test, expect}=require('@playwright/test');
const { text } = require('stream/consumers');


test("client login",async({browser})=>
{
   const context=await browser.newContext();
   const page=await context.newPage();
   const productname="ADIDAS ORIGINAL";
   const products=page.locator(".card-body");
   const emailId="anshika@gmail.com"
   const cvv="234";
   const cardName="Deep Nath"
   const cuponCode="rahulshettyacademy"
   page.goto("https://rahulshettyacademy.com/client/");
   await page.locator("#userEmail").fill(emailId);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');


   const count=await products.count();
   console.log("test count"+count);
   for(let i=0;i<count;i++)
    {
       if(await products.nth(i).locator("b").textContent()===productname)
       {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
       }
    }

   await page.locator("[routerlink*=cart]").click();
   page.locator("div li").first().waitFor();
   const bool= page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
   await expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   await page.locator("[placeholder='Select Country']").pressSequentially("ind");
   const dropdown=page.locator(".ta-results");
   await dropdown.waitFor();
   const countDropdown=await dropdown.locator("button").count(); 
   for(let i=0;i<countDropdown;i++){
   const text=await dropdown.locator("button").nth(i).textContent();
    if(text===" India"){
        await dropdown.locator("button").nth(i).click();
        break;
    }
   }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailId)
   
 await page.locator(".input").nth(3).fill(cvv);
 await page.locator(".input").nth(4).fill(cardName);
 await page.locator(".input").nth(5).fill(cuponCode);

// await page.fields.nth(3).fill(cvv);
// await page.fields.nth(4).fill(cardName);
// await page.fields.nth(5).fill(cuponCode);

   
await page.locator(".btn[type='submit']").waitFor(); 
await page.locator(".btn[type='submit']").click();
const couponApplyConfirm=page.locator(".small p");


await expect(couponApplyConfirm).toHaveText("* Coupon Applied");
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();


await page.locator(".btn[routerlink*='myorder']").click();
//await page.waitForLoadState('networkidle');
await page.locator("tbody").waitFor();
const rows=page.locator("tbody tr")
const orderCount=await orderLocator.count();


for(let i=0;i<orderCount;i++){
    const rowOrderId=await rows.nth(i).locator("th").textContent();
    
    if(orderId.includes(rowOrderId)){
       await orderLocator.nth(i).locator("button").first().click();
       break;
    }
}
const orederIdDetails=await page.locator("col-text").textContent();
expect(orderId.includes(orederIdDetails)).toBeTruthy();

});

