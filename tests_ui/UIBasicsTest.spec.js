import { chromium, test } from "@playwright/test";


test("First Playwright test", async({page}) => 

{
 await page.goto("http://rahulshettyacademy.com/loginpagePractise/");

});

test.only("Second Playwright test", async({page}) => 

{
 await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());
 

});

