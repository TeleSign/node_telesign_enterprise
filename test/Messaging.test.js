const MessagingClient = require('../src/messaging.js');
const { it, expect } = require('./TestFramework.js');


// MessagingClient Tests
async function messagingTest() {
  const customerId = process.env.CUSTOMER_ID  ||'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = process.env.API_KEY || 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const phoneNumber = process.env.PHONE_NUMBER || '11234567890';

  it('Testing omniMessage method', async () => {
    const messagingClient = new MessagingClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      const params = {
        "recipient": {
          "phone_number": phoneNumber
        },
        "message": {
          "sms": {
            "parameters": {
              "text": "test - All purchases today are 20% off!"
            },
            "template": "text"
          }
        },
        "message_type": "ARN",
        "channels": [
          {
            "channel": "sms",
            "fallback_time": 300
          }
        ]
      };
      messagingClient.omniMessage((err, res) => resolve(res), params);
    });
   
    expect(actualResponse.status.code).toEqual(3001);
  });

}

module.exports = { messagingTest };
