
import { chromium, test } from "@playwright/test";

test("Login test demo",async({page,context}) =>{

   /*
   const browser = await chromium.launch({headless: false});
   const context = await browser.newContext();
   const page = await context.newPage();
*/
await context.tracing.start(
   {snapshots:true,
    screenshots:true
   });

   await page.goto("https://demowebshop.tricentis.com/login")
   await page.waitForTimeout(5000);
   
   await page.locator('xpath=/html/body/div[4]/div[1]/div[1]/div[2]/div[1]/ul/li[2]/a').click();
   await page.locator('//*[@id="Email"]').fill('dieuphan.it1@gmail.com');
   await page.locator('//*[@id="Password"]').fill('Kathy@1983');
   await page.getByRole('button', { name: 'Log in' }).click();
   await page.waitForTimeout(5000);

   await context.tracing.stop(
      {path:'playwright-report/test1_trace.zip'});

   await page.locator('xpath=/html/body/div[4]/div[1]/div[1]/div[2]/div[1]/ul/li[1]/a').click(); 
   await page.locator('xpath=//*[@id="gender-male"]').check() 
   await page.getByText('Save').click();
   await page.locator('xpath=/html/body/div[4]/div[1]/div[1]/div[2]/div[1]/ul/li[2]/a').click() // Logout

})