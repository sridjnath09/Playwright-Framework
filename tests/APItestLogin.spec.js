const {test,expect,request}=require('@playwright/test');
//const payloadBody={userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token;

test.beforeAll(async()=>{
   const apiContext=await request.newContext();
   const responseLogin=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
   {
    data:{
        userEmail: "anshika@gmail.com",
        userPassword:"Iamking@000"
    }
})
await expect(responseLogin.ok()).toBeTruthy();
const loginResponseJson=responseLogin.json();
token=loginResponseJson.token;
console.log(token);

})


test("cleint app login using token",async({page})=>{
    page.addInitScript(value=>
        {
            window.localStorage.setItem('token',value)
        },token);



    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole("button",{name:"Sign Out"});    
})