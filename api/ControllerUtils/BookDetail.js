var utilController = require('../ControllerUtils/UtilController.js');

var self = module.exports = {

    /* ------Check book & list into the database----- */
    findbook: function($obj, callback, req, res) {
        Books.find($obj).exec(function(err, book) {
            callback(err, book, req, res);
        });
    },

    /* ------get book details from the database----- */
    getbook: function(err, book, req, res) {
        if (err) {
            utilController.LogError('1-1', 'bookdetail-bookdetails', 'getbook', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (book.length > 0 && book[0].IsActive == 1) {
            var result = {
                "_id": book[0].id,
                "BookId": book[0].BookId,
                "Name": book[0].Name,
                "AuthorName": book[0].AuthorName,
                "AuthorAddress": book[0].AuthorAddress,
                "CoverPhoto": book[0].CoverPhoto,
                "LibraryId": book[0].LibraryId,
                "CreatedBy": book[0].CreatedBy,
                "IsActive": book[0].IsActive
            };
            res.status(200);
            res.send(utilController.responsemessage(result));
        } else {
            res.status(401);
            res.send(sails.invalidRecord);
        }
    },


    /* ------Added new book in array obj and saved it into the database----- */
    insertbook: function(err, book, req, res) {
        if (err) {
            utilController.LogError('3-1', 'bookdetail-newbook', 'findbook', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (book.length > 0 && book[0].Name != null) {
            res.status(300);
            var message = book[0].Name + " book is already exist";
            res.send(utilController.responsemessage(message));
        } else {
            var objbook = {
                "Name": req.body.name.trim(),
                "AuthorName": req.body.authorname.trim(),
                "AuthorAddress": req.body.authoraddress.trim(),
                "CoverPhoto": req.body.coverphoto.trim(),
                "LibraryId": req.body.libraryid.trim(),
                "CreatedBy": req.body.createdby.trim(),
                "IsActive": req.body.isactive.trim(),
                "CreatedOn": utilController.currenttime(),
            };
            Books.create(objbook).exec(function createbook(err, addedbook) {
                if (err) {
                    utilController.LogError('3-1', 'bookdetail-newbook', 'addbook', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, addedbook, req, res);
                }
            });
        }
    },


    /* ------Update existing book----- */
    updatebook: function(err, book, req, res) {
        if (err) {
            utilController.LogError('4-1', 'bookdetail-updatebook', 'findbook', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (book.length > 0 && book[0].Name != null && book[0].Name != req.body.name.trim()) {
            res.status(300);
            var message = book[0].Name + " name is already exist";
            res.send(utilController.responsemessage(message));
        } else {
            var objBook = {
                "Name": req.body.name.trim(),
                "AuthorName": req.body.authorname.trim(),
                "AuthorAddress": req.body.authoraddress.trim(),
                "CoverPhoto": req.body.coverphoto.trim(),
                "LibraryId": req.body.libraryid.trim(),
                "IsActive": req.body.isactive.trim(),
                "LastUpdatedOn": utilController.currenttime()
            };
            Books.update({ 'BookId': req.body.bookid.trim() }, objBook).exec(function updatebook(err, updatedbook) {
                if (err) {
                    utilController.LogError('4-2', 'bookdetail-updatebook', 'updatebook', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, updatedbook, req, res);
                }
            });
        }
    },


    getresult: function(err, book, req, res) {
        if (err) {
            utilController.LogError('0', 'bookdetails', 'getresult', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else {
            res.status(200);
            res.send(utilController.responsemessage(book));
        }
    },
}