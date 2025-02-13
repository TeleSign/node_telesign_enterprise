const Telesign = require('telesignsdk');

/**
 * TeleSign's Messaging API allows you to easily send SMS messages. You can send alerts, reminders, and notifications,
 * or you can send verification messages containing one-time passcodes (OTP).
 */
class Messaging {

    constructor(customerId,
                apiKey,
                restEndpoint="https://rest-ww.telesign.com",
                timeout=10000,
                userAgent=null) {
        this.rest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent).rest;
        this.omniMessageResource = "/v1/omnichannel"
    }

    /**
    * Send a message to the target recipient using any of Telesign's supported channels.
    * @param params All required and optional parameters well-structured according to the API documentation.
    * <p>
    * See  https://developer.telesign.com/enterprise/reference/sendadvancedmessage for detailed API documentation.
    * </p>
    */
    omniMessage(callback, params = {}) {
        this.rest.setContentType("application/json")
        this.rest.execute(callback, "POST", this.omniMessageResource, params);
    }
}

module.exports = Messaging;