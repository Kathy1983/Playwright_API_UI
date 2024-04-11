import { test, expect,  request } from '@playwright/test';
import { ApiCommon } from '../utils/ApiCommon';

const LoginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};
let Token;
let OrderID ;

test("Find created Order on History with Creating Order API from Utils Common", async({page}) => 

{
  const apiContext = await request.newContext();

const ApiUtils = new ApiCommon(apiContext, LoginPayLoad);
Token = await ApiUtils.GetToken();
OrderID = await ApiUtils.CreateOrder(orderPayLoad);

console.log("This is My orderID:" + OrderID);

  page.addInitScript(value =>
    {
      window.localStorage.setItem('token',value);
    }, Token);

    await page.goto("https://rahulshettyacademy.com/client/");


await page.locator("//button[@routerlink='/dashboard/myorders']").click();
//await page.locator("tbody").waitFor();

const rows = page.locator("tbody tr");

for (let i = 0; i <rows.count() ; ++i )
{
 const rowOrderid =  await rows.nth(i).locator("th").textContent();
 if (OrderID.includes(rowOrderid))
 {
  await rows.nth(i).locator("button").first().click();
  break;
 }
 
 const orderIdDetails = await page.locator(".col-text").textContent();
 expect(OrderID.includes(orderIdDetails)).toBeTruthy();

} 

})


/*
test.beforeAll(async()=>
{
   
    const apiContext = await request.newContext();

   const ApiUtils = new ApiCommon(apiContext, LoginPayLoad);
   const Token = ApiUtils.GetToken();
   const OrderID =  ApiUtils.CreateOrder(orderPayLoad);

});

*/