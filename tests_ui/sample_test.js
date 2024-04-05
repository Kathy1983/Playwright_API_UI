const{test, expect} = require('@playwright/test')

test('this is sample test',async ({page}) =>
{
    
await page.goto('http://google.com')
await expect(page).toHaveTitle('Google')

}


)