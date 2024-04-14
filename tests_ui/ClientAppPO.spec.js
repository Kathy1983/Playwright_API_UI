import { chromium, expect, test } from "@playwright/test";
import { loginPage } from '../pageobjects/PO_LoginPage';
import { dashboardpage } from '../pageobjects/DashBoardPage';

// Json ---> covert to String -- convert to object

const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataSet)
{
test(`CLient App Login ${data.ProductName}`, async({page}) => 
{
   const loginpageClientApp = new loginPage(page);
   const Dashboardpage = new dashboardpage(page);

  await  loginpageClientApp.goTo();
  await  loginpageClientApp.ValidLogin(data.username,data.password);
  await  Dashboardpage.searchProduct(data.ProductName);
  await  Dashboardpage.navigateToCart();
 let response = {};
  response.orderId = await Dashboardpage.PlayOrder(data.username);
 await Dashboardpage.OrderDetail(console.orderId);

});

}


