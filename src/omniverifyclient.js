const Telesign = require('telesignsdk');
const util = require('util');

class OmniVerifyClient {

    constructor(restClient) {
        this.rest = restClient;
        this.verificationResource = "/verification"
        this.verificationStatusResource = "/verification/%s"
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
     * Use this action to get a verification process for the specified reference id.
     * <p>
     * See https://developer.telesign.com/enterprise/reference/getverificationprocess for detailed API documentation.
     */
    getVerificationProcess(callback, referenceId, params = {}) {
        this.rest.setContentType("application/json");
        const authMethod = "Basic";

        this.rest.execute(callback, "GET", util.format(this.verificationStatusResource, referenceId), params, authMethod);
    }
}

module.exports = OmniVerifyClient;