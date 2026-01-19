const { messagingTest } = require('./Messaging.test.js');
const { verifyTest } = require('./Verify.test.js');
const { omniverifyTest } = require('./OmniVerify.test.js');
const { phoneidTest } = require('./PhoneId.test.js');
const { scoreTest } = require('./ScoreClient.test.js');

messagingTest();
verifyTest();
omniverifyTest();
phoneidTest();
scoreTest();