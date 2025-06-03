const VerifyClient = require('../src/verify.js');
const { it, expect } = require('./TestFramework.js');


// VerifyClient Tests
async function verifyTest() {
  const customerId = process.env.CUSTOMER_ID  ||'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = process.env.API_KEY || 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const phoneNumber = process.env.PHONE_NUMBER || '11234567890';
  const testBaseUrl = "https://verify-stg.telesign.com";

  it('Testing createVerificationProcess method', async () => {
    const verifyClient = new VerifyClient(customerId, apiKey, testBaseUrl);

    const actualResponse = await new Promise((resolve) => {
      verifyClient.createVerificationProcess((err, res) => resolve(res), phoneNumber);
    });
 
    expect(actualResponse.status.code).toEqual(3901);
  });

}

module.exports = { verifyTest };
