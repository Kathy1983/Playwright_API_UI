const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {

constructor(page)
{  

    this.page = page;  
    this.UserName = page.getByLabel('E-Mail Address');
    this.PassWord = page.getByLabel('Password');
    this.SignInbutton= page.getByRole('button', { name: 'Login' });
    this.AlertSuccess=page.locator("//div[contains(@class,'alert alert-success')]");
 }

 async goTo()
 {
    await this.page.goto('https://ecommerce-playground.lambdatest.io/');    
    await this.page.hover("//a[@data-toggle='dropdown']//span[contains(.,'My account')]");
    await this.page.locator("//span[text()[normalize-space()='Login']]").click();
}

    async ValidLogin(username,password)
{
  await this.page.getByPlaceholder('E-Mail Address').click();
  await this.UserName.fill(username);
  await this.page.getByPlaceholder('E-Mail Address').press('Tab');
  await this.PassWord.fill(password);
  await this.SignInbutton.click();

  // Check login successfull or not

//await expect.soft(this.page.locator("//a[contains(.,'Edit Account')]")).toBeVisible();
await expect(this.page.locator("//a[contains(.,'Edit Account')]")).toBeVisible();

}


async UpdateProfile(randomFirstName)
{
   // const UpdateFirstName ='Kathy'+randomFirstName;

    await this.page.locator("//a[contains(.,'Edit your account information')]").click();
    await this.page.getByPlaceholder('First Name').click();
    await this.page.getByPlaceholder('First Name').fill(randomFirstName);
    await this.page.getByRole('button', { name: 'Continue' }).click();
   // Expect Login successfully 
    await expect(this.AlertSuccess).toHaveText("Success: Your account has been successfully updated.");

 }

 async SignOut()
 {
     await this.page.locator("//a[contains(text(),'Logout')]").click();
  
 }

 async InValidLogin(username,password)
{

  await this.page.getByPlaceholder('E-Mail Address').click();
  await this.UserName.fill(username);
  await this.page.getByPlaceholder('E-Mail Address').press('Tab');
  await this.PassWord.fill(password);
  await this.SignInbutton.click();
  //await expect(this.page).toHaveText("Warning: No match for E-Mail Address and/or Password.");
 
}
}




