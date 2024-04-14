import { chromium, expect, test } from "@playwright/test";
import { PoManager } from '../pageobjects/POManager';
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

const username = "anshika@gmail.com";
const password = "Iamking@000";
const ProductName = "ZARA COAT 3";  

test("CLient App Login", async({page}) => 

{
    const poManager = new PoManager(page) ;
   const loginpageClientApp = poManager.getLoginPage();
   const Dashboardpage =  poManager.getDashboardPage();

  await loginpageClientApp.goTo();
  await loginpageClientApp.ValidLogin(username,password);
  await  Dashboardpage.searchProduct(ProductName);
  await  Dashboardpage.navigateToCart();
 // await Dashboardpage.PlayOrder(username);
 let response = {};
  response.orderId = await Dashboardpage.PlayOrder(username);
 await Dashboardpage.OrderDetail(console.orderId);

});




