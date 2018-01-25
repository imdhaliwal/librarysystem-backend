/**
 * BooksController
 *
 * @description :: Server-side logic for managing Books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * @Author      :: Ranbir Dhaliwal
 * @RestAPI     :: Api with server side validations to create/update books link to the Library.
 */


var utilController = require('../ControllerUtils/UtilController.js');
var bookdetailController = require('../ControllerUtils/BookDetail.js');

module.exports = {
    book: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('bookid,libraryid', request)) {
                    $objbook = {
                        "BookId": request.body.bookid.trim(),
                        "LibraryId": request.body.libraryid.trim()
                    };
                    bookdetailController.findbook($objbook, bookdetailController.getbook, request, response);
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
            utilController.LogError('1', 'BooksController', 'bookdetails', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    bookslist: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,isactive', request)) {
                    $objbook = {
                        "LibraryId": request.body.libraryid.trim(),
                        "IsActive": request.body.isactive.trim()
                    };
                    bookdetailController.findbook($objbook, bookdetailController.getresult, request, response);
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
            utilController.LogError('2', 'BooksController', 'bookslist', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    addbook: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,name,authorname,authoraddress,coverphoto,isactive', request)) {
                    if (request.body.createdby == null || request.body.createdby == undefined) {
                        request.body.createdby = sails.ADMINKEY;
                    }
                    $objaddbook = {
                        "Name": request.body.name.trim(),
                        "LibraryId": request.body.libraryid.trim()
                    };
                    bookdetailController.findbook($objaddbook, bookdetailController.insertbook, request, response);
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
            utilController.LogError('3', 'BooksController', 'addbook', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },

    updatebook: function(request, response) {
        try {
            if (request.headers.apikey == sails.APIKEY) {
                if (utilController.isavailable('libraryid,bookid,name,authorname,authoraddress,coverphoto,isactive', request)) {
                    $objupdatebook = {
                        "LibraryId": request.body.libraryid.trim(),
                        "BookId": request.body.bookid.trim()
                    };
                    bookdetailController.findbook($objupdatebook, bookdetailController.updatebook, request, response);
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
            utilController.LogError('4', 'BooksController', 'updatebook', err);
            response.status(500);
            response.send(sails.internalServerError);
        }
    },
};