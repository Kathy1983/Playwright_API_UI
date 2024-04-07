import { chromium, expect, test } from "@playwright/test";


test.only("First Playwright test", async({page}) => 

{
    const UserEmail = page.locator("#userEmail");
    const Password = page.locator("#userPassword");
    const SignIn = page.locator("[value='Login']");  
    const cardTitles = page.locator(".card-body b");

await page.goto("https://rahulshettyacademy.com/client/");
 
await UserEmail.fill("anshika@gmail.com");
await Password.fill("Iamking@000");
await  SignIn.click();
await page.waitForLoadState("networkidle") ;
const titles = await cardTitles.allTextContents();
console.log(titles);

});




