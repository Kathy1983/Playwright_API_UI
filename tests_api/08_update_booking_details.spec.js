const { test, expect } = require('@playwright/test');
const { Console } = require('console');
var token


test('should be able update the booking details',async({request}) =>
{
// create a token which will be used in PUT method
const response = await request.post('/auth',
{
data:
{
    "username": "admin",
    "password": "password123"
}
});

console.log(await response.json());
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

const responseBody = await response.json();
token = responseBody.token;
console.log("New token is:"+ token);

// PUT method

    const updateRequest = await request.put("/booking/1",
    {
 headers:{
 'Content-Type': 'application/json',
'Accept': 'application/json',
'Cookie': 'token='+token,
       },
data:{
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
    "checkin": "2023-06-01",
    "checkout": "2023-06-15"
    },
    "additionalneeds": "Breakfast"
 }
 }
 ) ;
 console.log(await updateRequest.json());
 expect(updateRequest.ok()).toBeTruthy();
 expect(updateRequest.status()).toBe(200);
 const updatedResponseBody = await updateRequest.json()
 expect(updatedResponseBody).toHaveProperty("firstname", "Jim");
 expect(updatedResponseBody).toHaveProperty("lastname", "Brown");
 expect(updatedResponseBody).toHaveProperty("totalprice", 111);
 expect(updatedResponseBody).toHaveProperty("depositpaid", true);
 });

