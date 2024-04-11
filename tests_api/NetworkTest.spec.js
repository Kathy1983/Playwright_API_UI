import { test, expect } from '@playwright/test';

let Token;
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
var OrderID;
let fakePayLoadOrders = {data:[],message:"No Orders"};

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
page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

route=>
{
  // intercepting response - API response ->{playwright fakerespone} -> browser --> render data

  const response= page.request.fetch(route.request());
  let body= JSON.stringify(fakePayLoadOrders);
  route.fulfill(
    {
      response, 
      body,
    } ); 

});

await page.locator("//button[@routerlink='/dashboard/myorders']").click();
//await page.locator("tbody").waitFor();
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

console.log(await page.locator(".mt-4").textContent());


})
