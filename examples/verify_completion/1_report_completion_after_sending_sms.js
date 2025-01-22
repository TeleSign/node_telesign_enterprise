var TelesignSDK = require('telesignenterprisesdk');

console.log("## verify.sms ##");

const customerId = process.env.CUSTOMER_ID || "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const apiKey = process.env.API_KEY || "ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
const phoneNumber = process.env.PHONE_NUMBER || "11234567890";
const optionalParams = {verify_code: "32658"};
var referenceID = "";

const client = new TelesignSDK(customerId, apiKey);

// Callback for SMS
function smsCallback(error, responseBody) {
    if (error === null) {
        console.log(`SMS response for phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);

        if (responseBody['status']['code'] < 300) {
            console.log(`ReferenceID for voice call request: ${responseBody['reference_id']}.`)
            referenceID = responseBody['reference_id'];

            // Ask user for input and send completion report
            if (referenceID !== "") {
                prompt('Enter the verification code received:\n', function (input) {
                    if (input === optionalParams['verify_code']) {
                        console.log('Your code is correct.');

                        // Send completion report for correct code entered
                        client.verify.completion()
                    } else {
                        console.log('Your code is incorrect. input: ' + input + ", code: " + optionalParams['verify_code']);
                    }
                    process.exit();
                });
            }

        } else {
            console.log("Failed to send SMS.")
            console.log(responseBody);
            process.exit();
        }
    } else {
        console.error("Unable to send SMS. " + error);
    }
}

// Method to check user input
function prompt(question, callback) {
    const stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

// Callback for completion report
function completionCallback(error, responseBody) {
    if (error === null) {
        if (responseBody['status']['code'] == 1900) {
            console.log(`Successful completion response for phone number: ${phoneNumber}` +
                ` => code: ${responseBody['status']['code']}` +
                `, description: ${responseBody['status']['description']}`);
        } else {
            console.log(`Error during reporting completion.`);
        }
    } else {
        console.error("Unable to send completion report. " + error);
    }
}

// Send SMS request
client.verify.sms(smsCallback, phoneNumber, optionalParams);