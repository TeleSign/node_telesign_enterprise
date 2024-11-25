var TelesignSDK = require('telesignenterprisesdk');


console.log("## verify.voice ##");

const customerId = process.env.CUSTOMER_ID || "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const apiKey = process.env.API_KEY || "ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
const phoneNumber = process.env.PHONE_NUMBER || "11234567890";
const optionalParams = {verify_code: "32658"};

const client = new TelesignSDK(customerId, apiKey);

// Callback handler for voice
function voiceCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);

        // Ask for user input
        prompt('Enter the verification code received:\n', function (input) {
            if (input === optionalParams['verify_code']) {
                console.log('Your code is correct.');
            } else {
                console.log('Your code is incorrect. input: ' + input + ", code: " + optionalParams['verify_code']);
            }
            process.exit();
        });

    } else {
        console.error("Unable to send voice call. " + error);
    }
}

// Method to handle user input
function prompt(question, callback) {
    const stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

// Send Voice request
client.verify.voice(voiceCallback, phoneNumber, optionalParams);
