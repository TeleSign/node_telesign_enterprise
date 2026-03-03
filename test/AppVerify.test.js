const { it, expect } = require('./TestFramework.js');
const AppVerifyClient = require('../src/appverifyclient.js');

// AppVerifyClient Tests
function appVerifyTest() {
  const customerId = process.env.CUSTOMER_ID || 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = process.env.API_KEY || 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const phoneNumber = process.env.PHONE_NUMBER || '11234567890';

  it('Testing AppVerifyClient sendCode method', async () => {
    // Given
    const sut = new AppVerifyClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      // When
      sut.sendCode((err, res) => resolve(res), phoneNumber);
    });

    // Then
    expect([2400, 2401]).toContain(actualResponse.status.code);
    expect(actualResponse.sub_resource).toEqual("auto_verify_initiate");
  });

  it('Testing AppVerifyClient status method', async () => {
    // Given
    const sut = new AppVerifyClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      // When
      sut.sendCode((err, responseSendCode) => {
        sut.getStatus((err, responseGetStatus) => resolve(responseGetStatus), responseSendCode.reference_id);
      }, phoneNumber);
    });

    // Then
    expect([2400, 2401]).toContain(actualResponse.status.code);
    expect(actualResponse.sub_resource).toEqual("app_verify_api");
  });

  it('Testing AppVerifyClient endCall method', async () => {
    // Given
    const sut = new AppVerifyClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      // When
      sut.sendCode((err, responseSendCode) => {
        sut.endCall((err, responseEndCall) => resolve(responseEndCall), responseSendCode.reference_id);
      }, phoneNumber);
    });

    //sleep(10000)

    // Then
    expect([2400, 2401]).toContain(actualResponse.status.code);
    expect(actualResponse.sub_resource).toEqual("auto_verify_finalize");
  });

  it('Testing AppVerifyClient reportTimeout method', async () => {
    // Given
    const sut = new AppVerifyClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      // When
      sut.sendCode((err, responseSendCode) => {
        sut.reportTimeout((err, responseEndCall) => resolve(responseEndCall), responseSendCode.reference_id);
      }, phoneNumber);
    });

    // Then
    expect([2409]).toContain(actualResponse.status.code);
    expect(actualResponse.sub_resource).toEqual("auto_verify_finalize_timeout");
  });

  it('Testing AppVerifyClient reportCallerId method', async () => {
    // Given
    const sut = new AppVerifyClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      // When
      sut.sendCode((err, responseSendCode) => {
        sut.reportCallerId(
          (err, responseEndCall) => resolve(responseEndCall),
          responseSendCode.reference_id,
          "123456789",
        );
      }, phoneNumber);
    });

    // Then
    expect([2407]).toContain(actualResponse.status.code);
    expect(actualResponse.sub_resource).toEqual("auto_verify_finalize_unknown");
  });
}

module.exports = { appVerifyTest };
