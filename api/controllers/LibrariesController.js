/**
 * LibrariesController
 *
 * @description :: Server-side logic for managing Libraries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @Author      :: Ranbir Dhaliwal
 * @RestAPI     :: Api with server side validations to create/update Libraries.
 */

var utilController = require('../ControllerUtils/UtilController.js');
var librarydetailController = require('../ControllerUtils/LibraryDetail.js');

module.exports = {

    library: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid', request)) {
                    $objlibrary = {
                        "LibraryId": request.body.libraryid.trim()
                    };
                    librarydetailController.findlibrary($objlibrary, librarydetailController.getlibrary, request, response);
                } else {
                    response.status(449);
                    response.send(sails.requestNull);
                }
            } else {
                response.status(498);
                response.send(sails.invalidAPI);
            }
        } catch (err) {
            console.log(err);
            utilController.LogError('1', 'LibraryController', 'librarydetails', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    librarieslist: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('isactive', request)) {
                    $objlibrary = {
                        "IsActive": request.body.isactive.trim()
                    };
                    librarydetailController.findlibrary($objlibrary, librarydetailController.getresult, request, response);
                } else {
                    response.status(449);
                    response.send(sails.requestNull);
                }
            } else {
                response.status(498);
                response.send(sails.invalidAPI);
            }
        } catch (err) {
            console.log(err);
            utilController.LogError('2', 'LibraryController', 'librarieslist', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    addlibrary: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('name,address,isactive', request)) {
                    if (request.body.createdby == null || request.body.createdby == undefined) {
                        request.body.createdby = sails.ADMINKEY;
                    }
                    $objaddlibrary = {
                        "Name": request.body.name.trim(),
                        "CreatedBy": request.body.createdby.trim()
                    };
                    librarydetailController.findlibrary($objaddlibrary, librarydetailController.insertlibrary, request, response);
                } else {
                    response.status(449);
                    response.send(sails.requestNull);
                }
            } else {
                response.status(498);
                response.send(sails.invalidAPI);
            }
        } catch (err) {
            console.log(err);
            utilController.LogError('3', 'LibraryController', 'addlibrary', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    updatelibrary: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,name,address,isactive,createdby', request)) {
                    $objupdatelibrary = {
                        "CreatedBy": request.body.createdby.trim(),
                        "LibraryId": request.body.libraryid.trim()
                    };
                    librarydetailController.findlibrary($objupdatelibrary, librarydetailController.updatelibrary, request, response);
                } else {
                    response.status(449);
                    response.send(sails.requestNull);
                }
            } else {
                response.status(498);
                response.send(sails.invalidAPI);
            }
        } catch (err) {
            console.log(err);
            utilController.LogError('4', 'LibraryController', 'updatelibrary', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },
};