const { test, expect } = require('@playwright/test');


test('get booking item by filter first name and last name',async({request}) =>
{
    const response = await request.get("/booking",{
     /*   
        params:{fristname:"Susan",
                lastname:"Jackson"},
     */
                params:{checkin: "2021-01-15",
                       checkout: "2023-03-25"
                       },            
            });

    console.log(await response.json())
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});
