import { chromium, expect, test } from "@playwright/test";


test.only("First Playwright test", async({page}) => 

{
    const UserEmail = page.locator("#userEmail");
    const Password = page.locator("#userPassword");
    const SignIn = page.locator("[value='Login']");

    const products = page.locator(".card-body");
    const cardTitles = page.locator(".card-body b");
    const ProductName = "ZARA COAT 3";

await page.goto("https://rahulshettyacademy.com/client/");
 
await UserEmail.fill("anshika@gmail.com");
await Password.fill("Iamking@000");
await  SignIn.click();
await page.waitForLoadState("networkidle") ;
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
await page.locator("[placeholder*='Select Country']").pressSequentially("India", {delay:100});
const dropdown =  page.locator(".ta-results list-group ng-star-inserted");
// await dropdown.waitFor();
const optionCount = dropdown.locator("button").count();
for ( let i = 0; i < optionCount ; ++i)
{
    text =await dropdown.locator("button").nth(i).textContent();
    If (text=="India")
    {
        dropdown.locator("button").nth(i).click();
       break; 
    }
}

// await page.pause();

});




