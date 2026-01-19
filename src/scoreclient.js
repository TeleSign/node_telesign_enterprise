const Telesign = require('telesignsdk');
const util = require('util')
const { getInstalledVersion, getVersionDependency } = require('./helpers.js');

/***
 * ScoreClient for TeleSign Intelligence Cloud (Enterprise SDK).
 * Supports POST /intelligence/phone endpoint (Cloud migration required).
 * 
 * See https://developer.telesign.com/enterprise/reference/submitphonenumberforintelligencecloud
 * for detailed API documentation.
 */
class ScoreClient {

    constructor(customerId,
        apiKey,
        restEndpoint = "https://detect.telesign.com",
        timeout = 10000,
        userAgent = null) {
        const sdkVersionOrigin = getInstalledVersion()
        const sdkVersionDependency = getVersionDependency("telesignsdk")
        this.rest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent, "node_telesign_enterprise", sdkVersionOrigin, sdkVersionDependency).rest;

        this.scoreResource = "/intelligence/phone";
    }

    /***
     * Obtain a risk recommendation for a phone number using Telesign Intelligence Cloud API.
     *
     * Required parameters:
     * @param callback: Callback method to handle response
     * @param phoneNumber: Phone number to check (digits-only E.164 format)
     * @param accountLifecycleEvent: Required lifecycle event: 'create', 'sign-in', 'transact', 'update', 'delete'
     * 
     * Optional parameters:
     * @param options: Dictionary of optional parameters:
     *   - account_id: Your end user's account ID
     *   - device_id: Your end user's device ID  
     *   - email_address: Your end user's email address
     *   - external_id: Transaction ID in your system
     *   - originating_ip: End user's IP address (IPv4/IPv6)
     */
    score(callback, phoneNumber, accountLifecycleEvent, options = {}) {
        const params = {
            phone_number: phoneNumber,
            account_lifecycle_event: accountLifecycleEvent,
            ...(options.account_id && { account_id: options.account_id }),
            ...(options.device_id && { device_id: options.device_id }),
            ...(options.email_address && { email_address: options.email_address }),
            ...(options.external_id && { external_id: options.external_id }),
            ...(options.originating_ip && { originating_ip: options.originating_ip }),
        };

        this.rest.setContentType("application/x-www-form-urlencoded");
        this.rest.execute(callback, "POST", this.scoreResource, params);
    }
}

module.exports = ScoreClient;
