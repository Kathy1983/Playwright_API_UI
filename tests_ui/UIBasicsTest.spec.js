import { chromium, expect, test } from "@playwright/test";
import { text } from "stream/consumers";
import { allure } from "allure-playwright";

// returns ChildProcess instance



test("Second Playwright test", async({page}) => 

{
    const UserName = page.locator("#username");
    const SignIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

 await page.goto("http://rahulshettyacademy.com/loginpagePractise/");
 console.log(await page.title());
// css, xpath
await UserName.fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await page.locator("#signInBtn").click();
// console.log( await page.locator("//div[contains(@class,'alert alert-danger')]").textContent());
expect(page.locator("//div[contains(@class,'alert alert-danger')]").textContent('Incorrect username/password.'));
await  UserName.fill("rahulshettyacademy") ;
await page.locator("[type='password']").fill("learning");
await SignIn.click();

console.log("This is the first item on the list" + await page.locator("(//div[@class='card-body'])[1]").textContent());
console.log("This is the first item in index" + await cardTitles.first().textContent());
console.log("This is the second on the list" +await page.locator("(//div[@class='card-body'])").nth(2).textContent());
console.log("Alll text contents: " + await cardTitles.allTextContents());

});


test.only("@Web UI Control", async({page}) => 

{
    const UserName = page.locator("#username");
    const SignIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const cardTitles = page.locator(".card-body a");
    const documentlink = page.locator("[href*='documents-request']");

await page.goto("http://rahulshettyacademy.com/loginpagePractise/"); 
await UserName.fill("rahulshetty");
await page.locator("[type='password']").fill("learning");
await dropdown.selectOption("Consultant");
await page.locator(".radiotextsty").last().click();
    page.locator("#okayBtn").click();
//await page.pause();

await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();

 //expect(page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentlink).toHaveAttribute("class","blinkingText");

await page.locator("#signInBtn").click();


});

test("Child Window Handling", async({page}) => 

{    
    const UserName = page.locator("#username");
    const SignIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const cardTitles = page.locator(".card-body a");

await page.goto("http://rahulshettyacademy.com/loginpagePractise/"); 
const documentlink = page.locator("[href*='documents-request']");

const [newPage] = await Promise.all([
page.context().waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
documentlink.click(), // new page is opened
])

 const content = await newPage.locator(".red").textContent();
 const arrayText = content.split("@");
 const domain = arrayText[1].split(" ")[0]
 console.log(domain);
 await page.pause();
 console.log(await page.locator("#username").textContent()); 

})