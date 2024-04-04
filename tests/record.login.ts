import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
const randomFirstName = faker.string.numeric(4);

test('test LogiTest', async ({ page }) => {
  //await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');
 await page.goto('https://ecommerce-playground.lambdatest.io/');
    
 await page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
 
 //await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=account/login');

  await page.locator("//span[text()[normalize-space()='Login']]").click();
  await page.getByPlaceholder('E-Mail Address').click();
  await page.getByPlaceholder('E-Mail Address').fill('dieuphan.it1@gmail.com');
  await page.getByPlaceholder('E-Mail Address').press('Tab');
  await page.getByPlaceholder('Password').fill('Kathy@1983');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Edit your account' }).click();
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('Kathy'+randomFirstName);

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator("//a[contains(text(),'Logout')]").click();

});