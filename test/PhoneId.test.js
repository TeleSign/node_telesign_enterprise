const PhoneIdClient = require('../src/phoneid.js');
const { it, expect } = require('./TestFramework.js');


// PhoneIdClient Tests
async function phoneidTest() {
  const customerId = process.env.CUSTOMER_ID || 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = process.env.API_KEY || 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const phoneNumber = process.env.PHONE_NUMBER || '11234567890';

  it('Testing getInfo method', async () => {
    const phoneIdClient = new PhoneIdClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      phoneIdClient.getInfo((err, res) => resolve(res), phoneNumber);
    });

    expect(actualResponse.status.code).toEqual(300);
  });

  it('Testing getInfoAlt method', async () => {
    const phoneIdClient = new PhoneIdClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      phoneIdClient.getInfoAlt((err, res) => resolve(res), phoneNumber);
    });

    expect(actualResponse.status.code).toEqual(300);
  });

}

module.exports = { phoneidTest };
