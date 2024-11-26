var TelesignSDK = require('telesignenterprisesdk');


console.log("## verify.voice ##");

const customerId = process.env.CUSTOMER_ID || "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const apiKey = process.env.API_KEY || "ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
const phoneNumber = process.env.PHONE_NUMBER || "11234567890";
const optionalParams = {
    tts_message: "Votre code de vérification Widgets 'n' More est $$CODE$$.",
    language: "fr-FR"
};

const client = new TelesignSDK(customerId, apiKey);

// Callback handler for voice
function voiceCallback(error, responseBody) {
    if (error === null) {
        console.log(`SMS response for phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send voice. " + error);
    }
}

// Send voice request
client.verify.voice(voiceCallback, phoneNumber, optionalParams);
