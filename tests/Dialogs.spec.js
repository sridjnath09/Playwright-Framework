const {test,expect}=require('@playwright/test');


test("dialogue handling",async({page})=>{

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  page.on("dialog",dialog=>dialog.accept());
  await page.locator("#alertbtn").click();
  await page.locator("#mousehover").hover();
   
  //frames
  const iframePage=page.frameLocator("#courses-iframe");
  await iframePage.locator("li a[href*='lifetime-access']:visible").click();
  const subscriberCount=await iframePage.locator(".text h2").textContent();
  console.log(subscriberCount.split(" ")[1]);





}


)