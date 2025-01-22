var TelesignSDK = require('telesignenterprisesdk');


console.log("## phoneid.score ##");

const customerId = process.env.CUSTOMER_ID || "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const apiKey = process.env.API_KEY || "ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
const phoneNumber = process.env.PHONE_NUMBER || "11234567890";
const ucid = "BACF";

const client = new TelesignSDK(customerId, apiKey);

function phoneidCallback(error, responseBody) {
    if (error === null) {
        if (responseBody.hasOwnProperty('risk')) {
            console.log(`PhoneID response for phone number: ${phoneNumber}` +
                ` => risk level: ${responseBody['risk']['level']}` +
                `, recommendation: ${responseBody['risk']['recommendation']}`);
        } else {
            console.log(`Phone number score could not be retrieved.`);
            console.log(responseBody);
        }

    } else {
        console.error("Unable to send phoneID. " + error);
    }
}

client.phoneid.score(phoneidCallback, phoneNumber, ucid);

