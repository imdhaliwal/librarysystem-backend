var utilController = require('../ControllerUtils/UtilController.js');

var self = module.exports = {

    /* ------Check library & list into the database----- */
    findlibrary: function($obj, callback, req, res) {
        Libraries.find($obj).exec(function(err, library) {
            callback(err, library, req, res);
        });
    },

    /* ------get library details from the database----- */
    getlibrary: function(err, library, req, res) {
        if (err) {
            utilController.LogError('1-1', 'librarydetail-librarydetails', 'getlibrary', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (library.length > 0 && library[0].IsActive == 1) {
            var result = {
                "_id": library[0].id,
                "LibraryId": library[0].LibraryId,
                "Name": library[0].Name,
                "Address": library[0].Address,
                "CreatedBy": library[0].CreatedBy,
                "IsActive": library[0].IsActive
            };
            res.status(200);
            res.send(utilController.responsemessage(result));
        } else {
            res.status(401);
            res.send(sails.invalidRecord);
        }
    },

    /* ------Added new library in array obj and saved it to database----- */
    insertlibrary: function(err, library, req, res) {
        if (err) {
            utilController.LogError('3-1', 'librarydetail-newlibrary', 'findlibrary', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (library.length > 0 && library[0].Name != null) {
            res.status(300);
            var message = library[0].Name + " library is already exist";
            res.send(utilController.responsemessage(message));
        } else {
            var objlibrary = {
                "Name": req.body.name.trim(),
                "Address": req.body.address.trim(),
                "CreatedBy": req.body.createdby.trim(),
                "IsActive": req.body.isactive.trim(),
                "CreatedOn": utilController.currenttime(),
            };
            Libraries.create(objlibrary).exec(function createlibrary(err, addedlibrary) {
                if (err) {
                    utilController.LogError('3-2', 'librarydetail-newlibrary', 'addlibrary', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, addedlibrary, req, res);
                }
            });
        }
    },


    /* ------Update existing library----- */
    updatelibrary: function(err, library, req, res) {
        if (err) {
            utilController.LogError('4-1', 'librarydetail-updatelibrary', 'findlibrary', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else if (library.length > 0 && library[0].Name != null && library[0].Name != req.body.name.trim()) {
            res.status(300);
            var message = library[0].Name + " library is already exist";
            res.send(utilController.responsemessage(message));
        } else {
            var objLibrary = {
                "Name": req.body.name.trim(),
                "Address": req.body.address.trim(),
                "LastUpdatedOn": utilController.currenttime()
            };
            Libraries.update({ 'LibraryId': req.body.libraryid.trim() }, objLibrary).exec(function updatelibrary(err, updatedlibrary) {
                if (err) {
                    utilController.LogError('4-2', 'librarydetail-updatelibrary', 'updatedlibrary', err);
                    res.status(500);
                    res.send(sails.internalServerError);
                } else {
                    self.getresult(err, updatedlibrary, req, res);
                }
            });
        }
    },


    getresult: function(err, libraries, req, res) {
        if (err) {
            utilController.LogError('0', 'librarydetails', 'getresult', err);
            res.status(500);
            res.send(sails.internalServerError);
        } else {
            res.status(200);
            res.send(utilController.responsemessage(libraries));
        }
    },
}