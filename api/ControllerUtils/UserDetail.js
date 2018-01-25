var utilController = require('../ControllerUtils/UtilController.js');

var self = module.exports = {

    /* ------Check user details into the database----- */
    finduser: function($obj, callback, req, res) {
        Users.find($obj).exec(function(err, user) {
            callback(err, user, req, res);
        });
    },

    /* ------get user details from the database----- */
    getuser: function(err, user, req, res) {
        if (err) {
            utilController.LogError('1-1', 'userdetail-login', 'getuser', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (user.length > 0 && user[0].IsActive == 1) {
            var result = {
                "_id": user[0].id,
                "LibraryId": user[0].LibraryId,
                "UserId": user[0].UserId,
                "PhoneNo": user[0].PhoneNo,
                "FirstName": user[0].FirstName,
                "LastName": user[0].LastName,
                "UserName": user[0].UserName,
                "Email": user[0].Email,
                "UserTypeID": user[0].UserTypeID,
                "IsActive": user[0].IsActive
            };
            res.status(200);
            res.send(utilController.responsemessage(result));
        } else {
            res.status(401);
            res.send(sails.invalidUser);
        }
    },

    /* ------Added new user in array obj and saved it to database----- */
    insertuser: function(err, user, req, res) {
        if (err) {
            utilController.LogError('2-1', 'userdetails-newuser', 'finduser', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (user.length > 0 && user[0].UserName != null) {
            res.status(300);
            var message = user[0].UserName + " username is already exist";
            res.send(utilController.responsemessage(message));
        } else {
            var phoneno = req.body.phoneno.trim().replace(/ /g, '');
            var objUser = {
                "LibraryId": req.body.libraryid.trim(),
                "FirstName": req.body.firstname.trim(),
                "LastName": req.body.lastname.trim(),
                "UserName": req.body.username.trim(),
                "Password": utilController.encrypt(req.body.password.trim()),
                "Email": req.body.email.trim(),
                "PhoneNo": phoneno,
                "CreatedBy": req.body.createdby.trim(),
                "UserTypeID": req.body.usertypeid.trim(),
                "IsActive": req.body.isactive.trim(),
                "CreatedOn": utilController.currenttime(),
            };
            Users.create(objUser).exec(function createuser(err, addeduser) {
                if (err) {
                    utilController.LogError('2-2', 'userdetails-newuser', 'adduser', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, addeduser, req, res);
                }
            });
        }
    },


    /* ------Update existing user----- */
    updateuser: function(err, user, req, res) {
        if (err) {
            utilController.LogError('3-1', 'userdetails-updateuser', 'finduser', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (user.length > 0 && user[0].UserName != null && user[0].UserName != req.body.username.trim()) {
            res.status(300);
            var message = user[0].UserName + " username is already exist";
            res.send(utilController.responsemessage(message));
        } else {
            var phoneno = req.body.phoneno.trim().replace(/ /g, '');
            var objUser = {
                "LibraryId": req.body.libraryid.trim(),
                "FirstName": req.body.firstname.trim(),
                "LastName": req.body.lastname.trim(),
                "UserName": req.body.username.trim(),
                "Email": req.body.email.trim(),
                "PhoneNo": phoneno,
                "LastUpdatedOn": utilController.currenttime()
            };
            Users.update({ 'UserId': req.body.userid.trim() }, objUser).exec(function updateuser(err, updateduser) {
                if (err) {
                    utilController.LogError('3-2', 'userdetails-updateduser', 'updateuser', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, updateduser, req, res);
                }
            });
        }
    },

    getresult: function(err, user, req, res) {
        if (err) {
            utilController.LogError('0', 'userdetails', 'getresult', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else {
            res.status(200);
            res.send(utilController.responsemessage(user));
        }
    },
}