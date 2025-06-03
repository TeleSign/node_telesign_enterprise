const VerifyClient = require('../src/verify.js');
const { it, expect } = require('./TestFramework.js');
const OmniVerifyClient = require('../src/omniverifyclient.js');

// OmniVerifyClient Tests
function omniverifyTest() {
  const customerId = process.env.CUSTOMER_ID  ||'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = process.env.API_KEY || 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const phoneNumber = process.env.PHONE_NUMBER || '11234567890';

  it('Testing omni verify client createVerificationProcess method', async () => {
    // Given
    const sut = new OmniVerifyClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      // When
      sut.createVerificationProcess((err, res) => resolve(res), phoneNumber);
    });
 
    // Then
    expect(actualResponse.status.code).toEqual(3901);
  });

  it('Testing omni verify client getVerificationProcess method', async () => {
    // Given
    const sut = new OmniVerifyClient(customerId, apiKey);
    const createResponse = await new Promise((resolve) => {
      sut.createVerificationProcess((err, res) => resolve(res), phoneNumber);
    });

    const getResponse = await new Promise((resolve) => {
      // When
      sut.getVerificationProcess((err, res) => resolve(res), createResponse.reference_id);
    });
 
    // Then
    expect(getResponse.inner_methods[0].err_code).toEqual(3901);
    expect(getResponse.inner_methods[0].state).toEqual("ONGOING");
  });

}

module.exports = { omniverifyTest };
