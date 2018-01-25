/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: 'true',
    autoCreatedAt: false,
    autoPK: false,
    autoUpdatedAt: false,
    tableName: 'Users',
    attributes: {
        UserId: {
            type: 'string',
            unique: true,
            required: true,
            primaryKey: true,
            index: true,
            defaultsTo: function() {
                return sails.uuid.v1();
            }
        },
        UserName: {
            type: 'string',
            unique: true,
            required: true
        },
        PhoneNo: {
            type: 'string',
            unique: true,
            required: true
        },
        Password: {
            type: 'string',
            required: true,
            minLength: 6
        },
        FirstName: {
            type: 'string',
            required: true
        },
        LastName: {
            type: 'string'
        },
        Email: {
            type: 'string',
            unique: true,
            required: true,
            contains: '@'
        },
        LibraryId: {
            type: 'string',
            required: true
        },
        UserTypeID: {
            type: 'integer',
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
    },
};