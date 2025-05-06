const Telesign = require('telesignsdk');
const { getInstalledVersion, getVersionDependency } = require('./helpers.js');

/**
 * Telesign Messaging allows you to easily send a message to the target recipient using any of Telesign's supported channels.
 */
class Messaging {

    constructor(customerId,
                apiKey,
                restEndpoint="https://rest-ww.telesign.com",
                timeout=10000,
                userAgent=null) {
        const sdkVersionOrigin = getInstalledVersion()
        const sdkVersionDependency = getVersionDependency("telesignsdk")
        this.rest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent, "node_telesign_enterprise", sdkVersionOrigin, sdkVersionDependency).rest;
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