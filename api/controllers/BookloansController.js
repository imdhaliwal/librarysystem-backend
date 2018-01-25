/**
 * BookLoansController
 *
 * @description :: Server-side logic for managing Books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @Author      :: Ranbir Dhaliwal
 * @RestAPI     :: Api with server side validations to create/update books link to the Library.
 */


var utilController = require('../ControllerUtils/UtilController.js');
var bookloandetailController = require('../ControllerUtils/BookLoanDetail.js');

module.exports = {

    issuedbookslist: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,userid', request)) {
                    $objbookloan = {
                        "LibraryId": request.body.libraryid.trim(),
                        "UserId": request.body.userid.trim()
                    };
                    bookloandetailController.findbookloan($objbookloan, bookloandetailController.getresult, request, response);
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
            utilController.LogError('1', 'BookLoansController', 'bookloanslist', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    addbookloan: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,bookid,userid,cardno,issuedby', request)) {
                    if (request.body.issuedby == null || request.body.issuedby == undefined) {
                        request.body.issuedby = sails.ADMINKEY;
                    }
                    $objaddbookloan = {
                        "UserId": request.body.userid.trim(),
                        "Bookid": request.body.bookid.trim(),
                        "LibraryId": request.body.libraryid.trim(),
                        "IsActive": 1
                    };
                    bookloandetailController.findbookloan($objaddbookloan, bookloandetailController.insertbookloan, request, response);
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
            utilController.LogError('3', 'BookLoansController', 'addbookloan', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },


    updatebookloan: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('loanid,libraryid,bookid,userid,cardno,isactive', request)) {
                    $objupdatebook = {
                        "LoanId": request.body.loanid.trim(),
                        "LibraryId": request.body.libraryid.trim(),
                        "BookId": request.body.bookid.trim(),
                        "UserId": request.body.userid.trim()
                    };
                    bookloandetailController.findbookloan($objupdatebook, bookloandetailController.updatebookloan, request, response);
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
            utilController.LogError('4', 'BookLoansController', 'updatebookloan', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },


};