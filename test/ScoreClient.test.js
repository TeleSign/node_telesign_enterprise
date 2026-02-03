const ScoreClient = require('../src/scoreclient.js');
const { it, expect } = require('./TestFramework.js');

// ScoreClient Tests (Integration)
async function scoreTest() {
  const customerId = process.env.CUSTOMER_ID || 'FFFFFFFF-EEEE-DDDD-1234-AB1234567890';
  const apiKey = process.env.API_KEY || 'ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==';
  const phoneNumber = process.env.PHONE_NUMBER || '11234567890';

  it('Testing score method - basic (create event)', async () => {
    const scoreClient = new ScoreClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      scoreClient.score((err, res) => resolve(res), phoneNumber, 'create');
    });

    expect(actualResponse.status.code).toEqual(300);
  });

  it('Testing score method - full params (sign-in event)', async () => {
    const scoreClient = new ScoreClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      scoreClient.score((err, res) => resolve(res), phoneNumber, 'sign-in', {
        account_id: "account-123",
        device_id: "device-456",
        email_address: "user@example.com",
        external_id: "external-789",
        originating_ip: "192.0.2.1"
      });
    });

    expect(actualResponse.status.code).toEqual(300);
  });

  it('Testing score method - transact event', async () => {
    const scoreClient = new ScoreClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      scoreClient.score((err, res) => resolve(res), phoneNumber, 'transact');
    });

    expect(actualResponse.status.code).toEqual(300);
  });

  it('Testing score method - update event', async () => {
    const scoreClient = new ScoreClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      scoreClient.score((err, res) => resolve(res), phoneNumber, 'update');
    });

    expect(actualResponse.status.code).toEqual(300);
  });

  it('Testing score method - delete event', async () => {
    const scoreClient = new ScoreClient(customerId, apiKey);

    const actualResponse = await new Promise((resolve) => {
      scoreClient.score((err, res) => resolve(res), phoneNumber, 'delete');
    });

    expect(actualResponse.status.code).toEqual(300);
  });
}

module.exports = { scoreTest };
