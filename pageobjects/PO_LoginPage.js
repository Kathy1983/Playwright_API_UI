export const loginPage = class LoginPage
{
 constructor(page)
 {
    this.page = page;
    this.SignInButton = page.locator("[value='Login']");
    this.UserEmail = page.locator("#userEmail");
    this.Password = page.locator("#userPassword");

 }

 async goTo()
 {
    await this.page.goto("https://rahulshettyacademy.com/client");
        
 }

async ValidLogin(username, password)
{
await this.UserEmail.fill(username);
await this.Password.fill(password);
await this.SignInButton.click();
await this.page.waitForLoadState('networkidle');

}

}
