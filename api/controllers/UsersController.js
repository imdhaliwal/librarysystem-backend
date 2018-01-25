/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @Author      :: Ranbir Dhaliwal
 * @RestAPI     :: Api with server side validations to create/update/login users.
 */

var utilController = require('../ControllerUtils/UtilController.js');
var userdetailController = require('../ControllerUtils/UserDetail.js');

module.exports = {

    login: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,username,password', request)) {
                    $objlogin = {
                        "LibraryId": request.body.libraryid.trim(),
                        "UserName": request.body.username.trim(),
                        "Password": utilController.encrypt(request.body.password.trim()),
                        "UserTypeID": 2,
                        "IsActive": 1,
                    };
                    userdetailController.finduser($objlogin, userdetailController.getuser, request, response);
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
            utilController.LogError('1', 'UsersController', 'login', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    adduser: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,username,password,phoneno,firstname,lastname,email,usertypeid,isactive', request)) {
                    if (request.body.createdby == null || request.body.createdby == undefined) {
                        request.body.createdby = sails.ADMINKEY;
                    }
                    $objadduser = {
                        "LibraryId": request.body.libraryid.trim(),
                        "UserName": request.body.username.trim()
                    };
                    userdetailController.finduser($objadduser, userdetailController.insertuser, request, response);
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
            utilController.LogError('2', 'UsersController', 'adduser', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    updateuser: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,userid,username,phoneno,firstname,lastname,email', request)) {
                    $objupdateuser = {
                        "LibraryId": request.body.libraryid.trim(),
                        "UserId": request.body.userid.trim()
                    };
                    userdetailController.finduser($objupdateuser, userdetailController.updateuser, request, response);
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
            utilController.LogError('3', 'UsersController', 'updateuser', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },
};