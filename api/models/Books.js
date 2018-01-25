/**
 * Books.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
    schema: 'true',
    autoCreatedAt: false,
    autoPK: false,
    autoUpdatedAt: false,
    tableName: 'Books',
    attributes: {
        BookId: {
            type: 'string',
            unique: true,
            required: true,
            primaryKey: true,
            index: true,
            defaultsTo: function() {
                return sails.uuid.v1();
            }
        },
        Name: {
            type: 'string',
            required: true
        },
        AuthorName: {
            type: 'string',
            required: true
        },
        AuthorAddress: {
            type: 'string',
            required: true
        },
        CoverPhoto: {
            type: 'string',
            required: true
        },
        LibraryId: {
            type: 'string',
            required: true
        },
        CreatedBy: {
            type: 'string',
            required: true,
            defaultsTo: function() {
                return sails.ADMINKEY;
            }
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