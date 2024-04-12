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

/*     const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
   
 */
  await  loginpageClientApp.goTo();
  await  loginpageClientApp.ValidLogin(username,password);
  await  Dashboardpage.searchProduct(ProductName);
  await  Dashboardpage.navigateToCart();

/* const titles = await cardTitles.allTextContents();
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
} */
// await page.pause();

//await page.locator("[routerlink*='cart']").click();
//await page.locator("//button[@routerlink='/dashboard/cart']").click();

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

await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
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




