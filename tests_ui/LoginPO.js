import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

import { LoginPage } from '../pageobjects/LoginPage';
const randomFirstName = faker.string.numeric(4);


test('test LogiTest', async ({ page }) => {

  headless: false;
  const username = "dieuphan.it1@gmail.com";
  const InvalidUsername = "dieuphan.it1111@gmail.com";  
  const password ="Kathy@1983";
  const loginPage = new LoginPage(page);


await loginPage.goTo();
await loginPage.ValidLogin(username,password);
await loginPage.UpdateProfile(randomFirstName);
await loginPage.SignOut();
await loginPage.goTo();
await loginPage.InValidLogin(InvalidUsername,password);

/*
  //await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
 await page.goto('https://ecommerce-playground.lambdatest.io/');    
 await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
 await page.locator("//span[text()[normalize-space()='Login']]").click();
 //await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
*/
  
//await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
//await page.waitForTimeout(30000);


/*
  await page.getByPlaceholder('E-Mail Address').click();
  await page.getByPlaceholder('E-Mail Address').fill('dieuphan.it1@gmail.com');
  await page.getByPlaceholder('E-Mail Address').press('Tab');
  await page.getByPlaceholder('Password').fill('Kathy@1983');
  await page.getByRole('button', { name: 'Login' }).click();
*/
/*

  await page.getByRole('link', { name: ' Edit your account' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Kathy'+randomFirstName);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator("//a[contains(text(),'Logout')]").click();
*/

})

