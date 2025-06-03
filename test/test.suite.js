const { messagingTest } = require('./Messaging.test.js');
const { verifyTest } = require('./Verify.test.js');
const { omniverifyTest } = require('./OmniVerify.test.js');

messagingTest();
verifyTest();
omniverifyTest();