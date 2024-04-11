import { test, expect } from '@playwright/test';
let Token;
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
var OrderID;

test.beforeAll(async ({ request }) => {
    const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
        data: {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}

    });

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      const ResponseJson = await  response.json();
     // console.log(await response.json());
      Token = await ResponseJson.token;
      console.log("This is token:" + Token);

});


test("Client App Use Token to Login and create Order", async({page}) => 

{
    page.addInitScript(value =>
    {
      window.localStorage.setItem('token',value);
    }, Token);

    await page.goto("https://rahulshettyacademy.com/client/");

    /*
    const UserEmail = page.locator("#userEmail");
    const Password = page.locator("#userPassword");
    const SignIn = page.locator("[value='Login']");
     await UserEmail.fill(email);
     await Password.fill("Iamking@000");
     await  SignIn.click();
     await page.waitForLoadState("networkidle") ;
*/
    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
    const ProductName = "ZARA COAT 3";
    const email = "anshika@gmail.com";

const titles = await cardTitles.allTextContents();
console.log(titles);
const count = await products.count();

for (let i =0 ; i < count ; ++i)
{
 if (await products.nth(i).locator("b").textContent()==ProductName)
 {
    // Add product Zara Coat 3 to Card
  await products.nth(i).locator("text = Add To Cart").click();
  break;
 }
}
// await page.pause();

//await page.locator("[routerlink*='cart']").click();
await page.locator("//button[@routerlink='/dashboard/cart']").click();
await page.locator("div li").first().waitFor();

const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await  page.locator("[placeholder*='Select Country']").pressSequentially("India", {delay:400});

const dropdown = page.locator(".ta-results");
/*
//const dropdown =  page.locator(".ta-item list-group-item ng-star-inserted [type ='button']");
const dropdown =  page.locator("(//button[contains(@class,'ta-item list-group-item')])[2]");
await dropdown.click();
*/

const optionCount  = await dropdown.locator("button").count();
console.log(optionCount);

for ( let i = 0; i < optionCount ; ++i)
{
   const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() ==="India")
    {
       await dropdown.locator("button").nth(i).click();
       break; 
    }
}

await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator("(//input[@class='input txt'])[1]").fill("666");
await page.locator("(//input[@class='input txt'])[2]").fill("Kathy");
await page.locator("input[name='coupon']").fill("ABC");
await page.locator("//a[contains(.,'Place Order')]").click();
await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");

const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
// await page.pause();
console.log(orderID);


await page.locator("//button[@routerlink='/dashboard/myorders']").click();
await page.locator("tbody").waitFor();

const rows = page.locator("tbody tr");

for (let i = 0; i <rows.count() ; ++i )
{

 const rowOrderid =  await rows.nth(i).locator("th").textContent();
 if (orderID.includes(rowOrderid))
 {
  await rows.nth(i).locator("button").first().click();
  break;
 }
 
 const orderIdDetails = await page.locator(".col-text").textContent();
 expect(orderID.includes(orderIdDetails)).toBeTruthy();

}

});

 
test.only("Find created Order on History with Creating Order API", async({request , page}) => 

{
    
const responseCreatedOrder = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
{
        headers:{
         // 'Accept':'application/json, text/plain, */*',
          'Authorization':Token,
          'Content-Type':'application/json',
      } ,
       data: orderPayLoad
});

  const ResponseJson = await responseCreatedOrder.json();
  expect(responseCreatedOrder.ok()).toBeTruthy();
 expect(responseCreatedOrder.status()).toBe(201);

 console.log(ResponseJson);
  OrderID = await ResponseJson.orders[0];
  console.log("This is My orderID:" + OrderID);

  page.addInitScript(value =>
    {
      window.localStorage.setItem('token',value);
    }, Token);

    await page.goto("https://rahulshettyacademy.com/client/");


await page.locator("//button[@routerlink='/dashboard/myorders']").click();
await page.locator("tbody").waitFor();

const rows = page.locator("tbody tr");

for (let i = 0; i <rows.count() ; ++i )
{
 const rowOrderid =  await rows.nth(i).locator("th").textContent();
 if (orderID.includes(rowOrderid))
 {
  await rows.nth(i).locator("button").first().click();
  break;
 }
 
 const orderIdDetails = await page.locator(".col-text").textContent();
 expect(orderID.includes(orderIdDetails)).toBeTruthy();

}

})
