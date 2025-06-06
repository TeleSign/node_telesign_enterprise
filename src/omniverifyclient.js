const Telesign = require('telesignsdk');
const util = require('util');
const { getInstalledVersion, getVersionDependency } = require('./helpers.js');

class OmniVerifyClient {

    constructor(customerId,
                apiKey,
                restEndpoint="https://verify.telesign.com",
                timeout=10000,
                userAgent=null) {
        const sdkVersionOrigin = getInstalledVersion()
        const sdkVersionDependency = getVersionDependency("telesignsdk")
        this.rest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent, "node_telesign_enterprise", sdkVersionOrigin, sdkVersionDependency).rest;
        
        this.verificationResource = "/verification"
        this.verificationStatusResource = "/verification/%s"
        this.verificationUpdateResource = "/verification/%s/state"
    }

    /***
     * Use this action to create a verification process for the specified phone number.
     * See https://developer.telesign.com/enterprise/reference/createverificationprocess for detailed API documentation.
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to send SMS.
     * @param params: Dictionary of all optional parameters.
     */
    createVerificationProcess(callback, phoneNumber, params = {}) {
        this.rest.setContentType("application/json")
            
        params.recipient = {
            phone_number: phoneNumber
        }

        if (!("verification_policy" in params)) {
            params.verification_policy = [{ method: "sms" }]
        }
         
        this.rest.execute(callback, "POST", this.verificationResource, params);
    }

    /**
     * Use this action to get a verification process for the specified reference ID.
     * <p>
     * See https://developer.telesign.com/enterprise/reference/getverificationprocess for detailed API documentation.
     */
    getVerificationProcess(callback, referenceId, params = {}) {
        this.rest.setContentType("application/json");
        const authMethod = "Basic";

        this.rest.execute(callback, "GET", util.format(this.verificationStatusResource, referenceId), params, authMethod);
    }

    /**
     * Use this action to update a verification process for the specified reference ID.
     * <p>
     * See https://developer.telesign.com/enterprise/reference/updateverificationprocess for detailed API documentation.
     */
    updateVerificationProcess(callback, referenceId, action, securityFactor, optionalParams = null) {
        this.rest.setContentType("application/json");
        const authMethod = "Basic";
        var params = {
            action: action,
            security_factor: securityFactor
        };
        if (optionalParams != null) {
            params = Object.assign(params, optionalParams)
        }

        this.rest.execute(callback, "PATCH", util.format(this.verificationUpdateResource, referenceId), params, authMethod);
    }
}

module.exports = OmniVerifyClient;