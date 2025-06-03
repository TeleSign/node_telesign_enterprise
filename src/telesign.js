const Verify = require('./verify.js');
const PhoneID = require('./phoneid.js');
const Telebureau = require('./telebureau.js');
const Messaging = require('./messaging.js');
const OmniVerify = require('./omniverifyclient.js');

module.exports = class Telesign {
    constructor(customerId,
                apiKey,
                restEndpoint = "https://rest-ww.telesign.com",
                timeout = 10000,
                useragent = null) {

        this.verify = new Verify(customerId, apiKey, restEndpoint, timeout, useragent);
        this.phoneid = new PhoneID(customerId, apiKey, restEndpoint, timeout, useragent);
        this.telebureau = new Telebureau(customerId, apiKey, restEndpoint, timeout, useragent);
        this.messaging = new Messaging(customerId, apiKey, restEndpoint, timeout, useragent);
        this.omniVerify = new OmniVerify(customerId, apiKey, restEndpoint, timeout, useragent);
    }
};