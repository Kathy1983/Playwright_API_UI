const { test, expect } = require('@playwright/test');
import {faker} from '@faker-js/faker';
const {Datetime, DateTime} = require ("luxon");

const randomFirstName = faker.person.firstName()
const randomLastName = faker.person.lastName()
const randomNumber = faker.string.numeric(4)
const currentDate = DateTime.now().toFormat('yyyy-MM-dd')
const currentDatePluseFive = DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd')

test('should be able to create a booking', async ({ request }) => {
    const response = await request.post("/booking", {
        data: {
            "firstname": randomFirstName,
            "lastname": randomLastName,
            "totalprice": randomNumber,
            "depositpaid": true,
            "bookingdates": {
                "checkin": currentDate,
                "checkout": currentDatePluseFive
            },
            "additionalneeds": "Breakfast"
        }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", randomFirstName);
    expect(responseBody.booking).toHaveProperty("lastname", randomLastName);

});