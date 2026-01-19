const Verify = require('./verify.js');
const PhoneID = require('./phoneid.js');
const Telebureau = require('./telebureau.js');
const Messaging = require('./messaging.js');
const OmniVerify = require('./omniverifyclient.js');
const ScoreClient = require("./scoreclient.js");
const detectEndpoint= "https://detect.telesign.com";

module.exports = class Telesign {
    constructor(customerId,
                apiKey,
                restEndpoint = "https://rest-ww.telesign.com",
                timeout = 10000,
                useragent = null,
                urlOmniVerify = "https://verify.telesign.com") {
        this.omniVerify = new OmniVerify(customerId, apiKey, urlOmniVerify);
        this.verify = new Verify(customerId, apiKey, restEndpoint, timeout, useragent, urlOmniVerify);
        this.phoneid = new PhoneID(customerId, apiKey, restEndpoint, timeout, useragent);
        this.telebureau = new Telebureau(customerId, apiKey, restEndpoint, timeout, useragent);
        this.messaging = new Messaging(customerId, apiKey, restEndpoint, timeout, useragent);
        this.score = new ScoreClient(this.rest.requestWrapper, customerId, apiKey, detectEndpoint, timeout, userAgent);
    }
};