const Telesign = require('telesignsdk');
const util = require('util');
const { getInstalledVersion, getVersionDependency } = require('./helpers.js');

class AppVerifyClient {

    constructor(customerId,
        apiKey,
        restEndpoint = "https://rest-ww.telesign.com",
        timeout = 10000,
        userAgent = null) {
        const sdkVersionOrigin = getInstalledVersion()
        const sdkVersionDependency = getVersionDependency("telesignsdk")
        this.rest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent, "node_telesign_enterprise", sdkVersionOrigin, sdkVersionDependency).rest;
        this.contentType = "application/x-www-form-urlencoded"

        const appVerifyResource = "/v1/verify/auto/voice"

        // Finalize
        this.endCallResource = appVerifyResource + "/finalize"
        this.reportUnknownCallerResource = appVerifyResource + "/finalize/callerid"
        this.reportTimeoutResource = appVerifyResource + "/finalize/timeout"

        // Initiate
        this.initiateResource = appVerifyResource + "/initiate"

        // Transaction status
        this.statusResource = appVerifyResource + "/%s"
    }

    /**
     * Use this endpoint to terminate a call created using the Telesign App Verify API if the handset does not terminate the call in your application.
     *
     * See https://developer.telesign.com/enterprise/reference/endappverifycall for detailed API documentation.
     */
    endCall(callback, referenceId, verifyCode = "") {
        const params = {
            reference_id: referenceId
        }

        if (verifyCode && verifyCode.trim() !== "") {
            params.verify_code = verifyCode;
        }

        this.rest.setContentType(this.contentType)
        this.rest.execute(callback, "POST", this.endCallResource, params);
    }

    /**
     * Use this endpont to initiate verification of the specified phone number using the Telesign App Verify API.
     *
     * See https://developer.telesign.com/enterprise/reference/sendappverifycode for detailed API documentation.
     */
    sendCode(callback, phoneNumber, params = {}) {
        params.phone_number = phoneNumber;
        this.rest.setContentType(this.contentType);
        this.rest.execute(callback, "POST", this.initiateResource, params);
    }

    /**
     * If a Telesign App Verify API call is unsuccessful, the device will not receive the call.
     * If there is a prefix sent by Telesign in the initiate request and it cannot be matched to the CLI of the verification call,
     * you can use this endpoint to report the issue to Telesign for troubleshooting
     *
     * See https://developer.telesign.com/enterprise/reference/reportappverifycallerid for detailed API documentation.
     */
    reportCallerId(callback, referenceId, unknownCallerId, customerId = "") {
        const params = {
            reference_id: referenceId,
            unknown_caller_id: unknownCallerId
        }

        if (customerId && customerId.trim() !== "") {
            params.customer_id = customerId;
        }

        this.rest.setContentType(this.contentType);
        this.rest.execute(callback, "POST", this.reportUnknownCallerResource, params);
    }

    /**
     * If a mobile device verification call does not make it to the designated handset within the specified amount of time, you can use the Finalize Timeout endpoint to report the issue to Telesign.
     * 
     * See https://developer.telesign.com/enterprise/reference/reportappverifytimeout for detailed API documentation.
     */
    reportTimeout(callback, referenceId) {
        const params = {
            reference_id: referenceId
        }
        this.rest.setContentType(this.contentType);
        this.rest.execute(callback, "POST", this.reportTimeoutResource, params);
    }

    /**
     * Use this endpoint to get the status of a Telesign App Verify API request that you initiated
     *
     * See https://developer.telesign.com/enterprise/reference/getappverifystatus for detailed API documentation.
     */
    getStatus(callback, referenceId) {
        this.rest.setContentType(this.contentType);
        this.rest.execute(callback, "GET", util.format(this.statusResource, referenceId));
    }
}

module.exports = AppVerifyClient;