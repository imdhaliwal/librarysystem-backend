/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

    sails.APIKEY = "542f0190-ad6f-11e5-93d5-039280b0a321";
    sails.ADMINKEY = "d0b64db0-012b-11e8-9731-751812ab0bab";
    sails.EMNO = "9417941370";
    //sails.Client = require('node-rest-client').Client;
    sails.moment = require('moment');
    sails.uuid = require('node-uuid');
    //sails.fs = require('fs');
    sails.crypto = require('crypto');
    sails.algorithm = 'aes-256-ctr';
    sails.password = 'd6F3Efeq';

    //Static Response Messages
    sails.requestNull = {
        "ResponseCode": "001",
        "Message": "Request Parameter is null"
    };

    sails.invalidAPI = {
        "response": {
            "id": "002",
            "desc": "Invalid API"
        }
    };

    sails.internalServerError = {
        "ResponseCode": "99",
        "Message": "Internal Server Error, please contact the admin Mobile Number:" + sails.EMNO
    };

    sails.changeSaveSuccess = {
        "ResponseCode": "100",
        "Message": "Changes saved successfully"
    };

    sails.recordDeleteSuccess = {
        "ResponseCode": "100",
        "Message": "Record deleted successfully"
    };

    sails.invalidUser = {
        "ResponseCode": "003",
        "Message": "Invalid user"
    };

    sails.invalidRecord = {
        "ResponseCode": "004",
        "Message": "Invalid Record"
    };

    sails.noRecordFound = {
        "ResponseCode": "005",
        "Message": "No Records Found"
    };

    cb();
};