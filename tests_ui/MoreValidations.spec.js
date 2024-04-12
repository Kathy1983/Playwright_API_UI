import { chromium, expect, test } from "@playwright/test";
import { time } from "console";
import exp from "constants";

const {Datetime, DateTime} = require ("luxon");



test.only("Popup validations", async({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await  page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await  page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();

    //await page.screenshot({path:'screenshot.png'});
    // click on popup
    // await page.pause();
    page.on("dialog", dialog => dialog.accept());
    await  page.locator("#confirmbtn").click();
    await  page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");
 await framePage.locator("li a[href*='lifetime-access']:visible").click();
 
 await framePage.locator(".text h2").screenshot({path:'framePage'+DateTime.TIME_24_SIMPLE()+'.png'});

 const textCheck = await framePage.locator(".text h2").textContent();
 console.log(textCheck.split(" ")[1]);
 
});