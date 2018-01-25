/**
 * Libraries.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
    schema: 'true',
    autoCreatedAt: false,
    autoPK: false,
    autoUpdatedAt: false,
    tableName: 'Libraries',
    attributes: {
        LibraryId: {
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
        Address: {
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