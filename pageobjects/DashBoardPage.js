// import { loginPage } from '../pageobjects/PO_LoginPage';
import { expect} from "@playwright/test";

export const dashboardpage = class DashBoardPage

{
 constructor(page)
 {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cardTitles = page.locator(".card-body b");
    this.ProductName = "ZARA COAT 3"; 
    this.cart = page.locator("//button[@routerlink='/dashboard/cart']") 

 }

async searchProduct(productName )
{
   const titles = await this.cardTitles.allTextContents();
   console.log(titles);
   const count = await this.products.count();
   
   for (let i =0 ; i < count ; ++i)
   {
    if (await this.products.nth(i).locator("b").textContent()==productName)
    {
       // Add product Zara Coat 3 to Card
     await this.products.nth(i).locator("text = Add To Cart").click();
     break;
    }
   }
}

async navigateToCart()
{
    await this.cart.click();
}

async PlayOrder(username)
{
 await this.page.locator("div li").first().waitFor();
const bool = await this.page.locator("h3:has-text('ZARA COAT 3')").isVisible()
await this.page.locator("text=Checkout").click();
await  this.page.locator("[placeholder*='Select Country']").pressSequentially("India", {delay:400});
const dropdown = this.page.locator(".ta-results");
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

await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(username);
await this.page.locator("(//input[@class='input txt'])[1]").fill("666");
await this.page.locator("(//input[@class='input txt'])[2]").fill("Kathy");
await this.page.locator("input[name='coupon']").fill("ABC");
await this.page.locator("//a[contains(.,'Place Order')]").click();
await expect(this.page.locator(".hero-primary")).toHaveText("Thankyou for the order. ");

const orderID = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
// await page.pause();
console.log(orderID);
let response = {};
response.orderId = orderID;
return response.orderId;

}

async OrderDetail(orderID)
{

await this.page.locator("//button[@routerlink='/dashboard/myorders']").click();
await this.page.locator("tbody").waitFor();

const rows = this.page.locator("tbody tr");

for (let i = 0; i <rows.count() ; ++i )
{

 const rowOrderid =  await rows.nth(i).locator("th").textContent();
 if (orderID.includes(rowOrderid))
 {
  await rows.nth(i).locator("button").first().click();
  break;
 }
 
 const orderIdDetails = await this.page.locator(".col-text").textContent();
 expect(orderID.includes(orderIdDetails)).toBeTruthy();

}

}

}