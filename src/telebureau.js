const Telesign = require('telesignsdk');
const util = require('util');

/***
 * TeleBureau is a service is based on TeleSign's watchlist, which is a proprietary database containing verified phone
 * numbers of users known to have committed online fraud. TeleSign crowd-sources this information from its customers.
 * Participation is voluntary, but you have to contribute in order to benefit.
 */
class Telebureau {

    constructor(customerId,
                apiKey,
                restEndpoint="https://rest-ww.telesign.com",
                timeout=10000,
                userAgent=null) {

        this.rest = new Telesign(customerId, apiKey, restEndpoint, timeout, userAgent).rest;

        this.createResource = "/v1/telebureau/event";
        this.retrieveResource = "/v1/telebureau/event/%s";
        this.deleteResource = "/v1/telebureau/event/%s";
    }

    /***
     * Creates a telebureau event corresponding to supplied data.
     *
     * See https://developer.telesign.com/docs/telebureau-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number associated with the event.
     * @param fraudType: The type of fraud committed.
     * @param occurredAt: Datetime specifying when the fraud event occurred in RFC 3339 format
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    createEvent(callback, phoneNumber, fraudType, occurredAt, optionalParams=null) {
        let params = {
            phone_number: phoneNumber,
            fraud_type: fraudType,
            occurred_at: occurredAt
        };
        if (optionalParams !== null) {
            params = Object.assign(params, optionalParams)
        }

        this.rest.execute(callback, "POST", this.createResource, params);
    }

    /***
     * Retrieves the fraud event status. You make this call in your web application after completion of create
     * transaction for a telebureau event.
     *
     * See https://developer.telesign.com/docs/telebureau-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param referenceID: reference_id for the transaction from Telesign's response on create.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    retrieveEvent(callback, referenceID, optionalParams=null) {
        this.rest.execute(callback, "GET", util.format(this.retrieveResource, referenceID), optionalParams);
    }

    /***
     * Deletes a previously submitted fraud event. You make this call in your web application after completion of the
     * create transaction for a telebureau event.
     *
     * See https://developer.telesign.com/docs/telebureau-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param referenceID: reference_id for the transaction from Telesign's response on create.
     * @param optionalParams: Dictionary of all optional parameters.
     * transaction.
     */
    deleteEvent(callback, referenceID, optionalParams=null) {
        this.rest.execute(callback, "DELETE", util.format(this.deleteResource, referenceID), optionalParams);
    }
}

module.exports = Telebureau;