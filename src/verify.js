const Telesign = require('telesignsdk');
const util = require('util');
const OmniVerify = require('./omniverifyclient.js');
const { getInstalledVersion, getVersionDependency } = require('./helpers.js');

/***
 * The Verify API delivers phone-based verification and two-factor authentication using a time-based, one-time passcode
 * sent via SMS message or Voice call.
 */
class Verify {

    constructor(customerId,
                apiKey,
                restEndpoint="https://rest-ww.telesign.com",
                timeout=10000,
                userAgent=null,
                urlOmniVerify="https://verify.telesign.com") {
        const sdkVersionOrigin = getInstalledVersion()
        const sdkVersionDependency = getVersionDependency("telesignsdk")
        const telesignRest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent, "node_telesign_enterprise", sdkVersionOrigin, sdkVersionDependency).rest;
        this.rest = telesignRest;
        this.smsResource = "/v1/verify/sms"
        this.voiceResource = "/v1/verify/call"
        this.smartResource = "/v1/verify/smart"
        this.statusResource = "/v1/verify/%s"
        this.completionResource = "/v1/verify/completion/%s"
        this.defaultFsBaseUrl = restEndpoint;
        this.omniVerifyClient = new OmniVerify(customerId, apiKey, urlOmniVerify);
    }

    /***
     * The SMS Verify API delivers phone-based verification and two-factor authentication using a time-based,
     * one-time passcode sent over SMS.
     *
     * See https://developer.telesign.com/docs/rest_api-verify-sms for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to send SMS.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    sms(callback, phoneNumber, optionalParams=null) {
        var params = {
            phone_number: phoneNumber,
        };
        if (optionalParams !== null) {
            params = Object.assign(params, optionalParams)
        }

        this.rest.execute(callback, "POST", this.smsResource, params);
    }

    /***
     * Use this action to create a verification process for the specified phone number.
     * See https://developer.telesign.com/enterprise/reference/createverificationprocess for detailed API documentation.
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to send SMS.
     * @param params: Dictionary of all optional parameters.
     */
     createVerificationProcess(callback, phoneNumber, params = {}) {
        this.omniVerifyClient.createVerificationProcess(callback, phoneNumber, params);
    }

    /***
     * The Voice Verify API delivers patented phone-based verification and two-factor authentication using a one-time
     * passcode sent over voice message.
     *
     * See https://developer.telesign.com/docs/rest_api-verify-call for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to send the voice call.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    voice(callback, phoneNumber, optionalParams=null) {
        var params = {
            phone_number: phoneNumber,
        };
        if (optionalParams !== null) {
            params = Object.assign(params, optionalParams)
        }

        this.rest.execute(callback, "POST", this.voiceResource, params);
    }

    /***
     * The Smart Verify web service simplifies the process of verifying user identity by integrating several TeleSign
     * web services into a single API call. This eliminates the need for you to make multiple calls to the TeleSign
     * Verify resource.
     *
     * See https://developer.telesign.com/docs/rest_api-smart-verify for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to send the smart message.
     * @param ucid: A string that specifies one of the use case codes.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    smart(callback, phoneNumber, ucid, optionalParams=null) {
        var params = {
            phone_number: phoneNumber,
            ucid: ucid
        };
        if (optionalParams !== null) {
            params = Object.assign(params, optionalParams)
        }

        this.rest.execute(callback, "POST", this.smartResource, params);
    }

    /***
     * Retrieves the verification result for any verify resource.
     *
     * See https://developer.telesign.com/docs/rest_api-verify-transaction-callback for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param referenceID: reference_id for the transaction from Telesign's response.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    status(callback, referenceID, optionalParams=null) {
        this.rest.execute(callback, "GET", util.format(this.statusResource, referenceID), optionalParams);
    }

    /***
     * Notifies TeleSign that a verification was successfully delivered to the user in order to help improve
     * the quality of message delivery routes.
     *
     * See https://developer.telesign.com/docs/completion-service-for-verify-products for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param referenceID: reference_id for the transaction from Telesign's response.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    completion(callback, referenceID, optionalParams=null) {
        this.rest.execute(callback, "PUT", util.format(this.completionResource, referenceID), optionalParams);
    }

}

module.exports = Verify;