const { test, expect } = require('@playwright/test');


test('get all booking item',async({request}) =>
{
    const response = await request.get("/booking/1");
    console.log(await response.json())
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

