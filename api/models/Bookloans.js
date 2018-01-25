/**
 * Bookloans.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
    schema: 'true',
    autoCreatedAt: false,
    autoPK: false,
    autoUpdatedAt: false,
    tableName: 'Bookloans',
    attributes: {
        LoanId: {
            type: 'string',
            unique: true,
            required: true,
            primaryKey: true,
            index: true,
            defaultsTo: function() {
                return sails.uuid.v1();
            }
        },
        BookId: {
            type: 'string',
            required: true
        },
        LibraryId: {
            type: 'string',
            required: true
        },
        UserId: {
            type: 'string',
            required: true
        },
        CardNo: {
            type: 'string',
            required: true
        },
        IssuedBy: {
            type: 'string',
            required: true,
            defaultsTo: function() {
                return sails.ADMINKEY;
            }
        },
        DateOut: {
            type: 'date',
            required: true
        },
        DueDate: {
            type: 'date',
            required: true
        },
        DateIn: {
            type: 'date'
        },
        IsActive: {
            type: 'integer',
            required: true
        },
        CreatedOn: {
            type: 'date'
        },
        LastUpdatedOn: {
            type: 'date'
        },
    }
};