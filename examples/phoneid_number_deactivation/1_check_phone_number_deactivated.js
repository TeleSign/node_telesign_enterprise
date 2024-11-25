var TelesignSDK = require('telesignenterprisesdk');


console.log("## phoneid.numberDeactivation ##");

const customerId = process.env.CUSTOMER_ID || "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const apiKey = process.env.API_KEY || "ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
const phoneNumber = process.env.PHONE_NUMBER || "11234567890";
const ucid = "ATCK";

const client = new TelesignSDK(customerId, apiKey);

function phoneidCallback(error, responseBody) {
    if (error === null) {

        if (responseBody.hasOwnProperty('number_deactivation')) {
            console.log(`PhoneID response for phone number: ${phoneNumber}` +
                ` => phone number: ${responseBody['number_deactivation']['number']}` +
                `, last deactivated: ${responseBody['number_deactivation']['last_deactivated']}`);
        } else {
            console.log(`Phone number ${phoneNumber} has not been deactivated.`);
            console.log(responseBody);
        }

    } else {
        console.error("Unable to send phoneID numberDeactivation. " + error);
    }
}

client.phoneid.numberDeactivation(phoneidCallback, phoneNumber, ucid);

