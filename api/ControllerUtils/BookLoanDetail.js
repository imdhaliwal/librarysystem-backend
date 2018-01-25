var utilController = require('../ControllerUtils/UtilController.js');

var self = module.exports = {

    /* ------Check bookloan & list into the database----- */
    findbookloan: function($obj, callback, req, res) {
        Bookloans.find($obj).exec(function(err, bookloan) {
            callback(err, bookloan, req, res);
        });
    },

    /* ------get bookloan details from the database----- */
    getbookloan: function(err, bookloan, req, res) {
        if (err) {
            utilController.LogError('1-1', 'bookloandetail-bookloandetails', 'getbookloan', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (bookloan.length > 0 && bookloan[0].IsActive == 1) {
            var result = {
                "_id": bookloan[0].id,
                "LoanId": bookloan[0].LoanId,
                "BookId": bookloan[0].BookId,
                "LibraryId": bookloan[0].LibraryId,
                "UserId": bookloan[0].UserId,
                "CardNo": bookloan[0].CardNo,
                "DateOut": bookloan[0].DateOut,
                "DueDate": bookloan[0].DueDate,
                "DateIn": bookloan[0].DateIn,
                "IssuedBy": bookloan[0].IssuedBy,
                "IsActive": bookloan[0].IsActive
            };
            res.status(200);
            res.send(utilController.responsemessage(result));
        } else {
            res.status(401);
            res.send(sails.invalidRecord);
        }
    },


    /* ------Added new book in array obj and saved it into the database----- */
    insertbookloan: function(err, bookloan, req, res) {
        if (err) {
            utilController.LogError('3-1', 'bookloandetail-newloan', 'findbookloan', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (bookloan.length > 0) {
            res.status(300);
            var message = "This Book has been already issued on " + bookloan[0].DateOut;
            res.send(utilController.responsemessage(message));
        } else {
            var objbookloan = {
                "BookId": req.body.bookid.trim(),
                "LibraryId": req.body.libraryid.trim(),
                "UserId": req.body.userid.trim(),
                "CardNo": req.body.cardno.trim(),
                "DateOut": utilController.currenttime(),
                "DueDate": utilController.currenttime(15),
                "DateIn": req.body.datein,
                "IssuedBy": req.body.issuedby.trim(),
                "IsActive": req.body.isactive.trim(),
                "CreatedOn": utilController.currenttime(),
            };
            Bookloans.create(objbookloan).exec(function createbookloan(err, addedbookloan) {
                if (err) {
                    utilController.LogError('3-1', 'bookloandetail-newbookloan', 'addedbookloan', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, addedbookloan, req, res);
                }
            });
        }
    },


    /* ------Update existing issued books for a user----- */
    updatebookloan: function(err, bookloan, req, res) {
        if (err) {
            utilController.LogError('4-1', 'bookloandetail-updatebookloan', 'findbookloan', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (bookloan.length > 0 && bookloan[0].IsActive == 0) {
            res.status(300);
            var message = "This Book has been already returned on " + bookloan[0].DateIn;
            res.send(utilController.responsemessage(message));
        } else {
            var objbookloan = {
                "DateIn": utilController.currenttime(),
                "IsActive": req.body.isactive.trim(),
                "LastUpdatedOn": utilController.currenttime()
            };
            Bookloans.update({ 'LoanId': req.body.loanid.trim(), 'BookId': req.body.bookid.trim() }, objbookloan).exec(function updatebookloan(err, updatedbookloan) {
                if (err) {
                    utilController.LogError('4-2', 'bookdetail-updatebookloan', 'updatebookloan', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, updatedbookloan, req, res);
                }
            });
        }
    },

    getresult: function(err, bookloan, req, res) {
        if (err) {
            utilController.LogError('0', 'bookloandetails', 'getresult', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else {
            res.status(200);
            res.send(utilController.responsemessage(bookloan));
        }
    },
}