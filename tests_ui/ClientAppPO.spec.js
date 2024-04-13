import { chromium, expect, test } from "@playwright/test";
import { loginPage } from '../pageobjects/PO_LoginPage';
import { dashboardpage } from '../pageobjects/DashBoardPage';

const username = "anshika@gmail.com";
const password = "Iamking@000";
const ProductName = "ZARA COAT 3";  

test("CLient App Login", async({page}) => 

{
   const loginpageClientApp = new loginPage(page);
   const Dashboardpage = new dashboardpage(page);

  await  loginpageClientApp.goTo();
  await  loginpageClientApp.ValidLogin(username,password);
  await  Dashboardpage.searchProduct(ProductName);
  await  Dashboardpage.navigateToCart();
 // await Dashboardpage.PlayOrder(username);
 let response = {};
  response.orderId = await Dashboardpage.PlayOrder(username);
 await Dashboardpage.OrderDetail(console.orderId);

 //  await  Dashboardpage.OrderDetail(OrderID);

/* await page.locator("//button[@routerlink='/dashboard/myorders']").click();
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

} */

});




