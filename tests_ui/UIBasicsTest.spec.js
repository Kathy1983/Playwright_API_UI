import { chromium, expect, test } from "@playwright/test";


test("First Playwright test", async({page}) => 

{
 await page.goto("http://rahulshettyacademy.com/loginpagePractise/");

});

test.only("Second Playwright test", async({page}) => 

{
 await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());
// css, xpath
await page.locator("#username").fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await page.locator("#signInBtn").click();

 
});

