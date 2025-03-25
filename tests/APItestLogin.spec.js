const {test,expect,request}=require('@playwright/test');
const {APIUtils}=require('./utils/APIUtils');

const payloadBody={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const createOrderPayload={orders: [{country: "India", productOrderedId: "67a8df56c0d3e6622a297ccd"}]};
let response;

test.beforeAll(async()=>{
   const apiContext=await request.newContext();
   const apiUtils= new APIUtils(apiContext,payloadBody);
   response=await apiUtils.createOrder(createOrderPayload);
})


test("cleint app login using token",async({page})=>{
     page.addInitScript(value=>
        {
            window.localStorage.setItem('token',value)
        },response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible();

     //validate orderID in order history
     await page.getByRole("button",{name:"ORDERS"}).click();
     await page.waitForLoadState("networkidle");
     const orderList=await page.locator("tbody .ng-star-inserted th");
     
     //await orderList.waitFor();
     console.log("api order ID "+ response.createdOrderID)
     await expect(page.getByText(response.createdOrderID)).toBeVisible();
     

})


