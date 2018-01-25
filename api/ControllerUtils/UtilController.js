     /**
      * UtilController
      *
      * @description :: Server-side logic for managing utils
      * @help        :: See http://links.sailsjs.org/docs/controllers
      */

     self = module.exports = {

         LogError: function(Position, Controller, Action, Message) {
             //sails.log.error(Message, { metaData: { position: Position, controller: Controller, action: Action } });
             sails.log.error(Message);
         },

         isavailable: function(parameter, request) {
             parameterArray = parameter.split(',');
             for (i = 0; i < parameterArray.length; i++) {
                 if (request.body[parameterArray[i].trim()] != undefined && request.body[parameterArray[i].trim()] != "") {} else {
                     return false;
                 }
             }
             return true;
         },

         responsemessage: function(result, message) {
             respose = {
                 "ResponseCode": "100",
                 "Result": result,
                 "Message": message
             }
             return respose;
         },

         encrypt: function(code) {
             var cipher = sails.crypto.createCipher(sails.algorithm, sails.password)
             var crypted = cipher.update(code, 'utf8', 'hex')
             crypted += cipher.final('hex');
             return crypted;
         },

         decrypt: function(code) {
             var decipher = sails.crypto.createDecipher(sails.algorithm, sails.password)
             var dec = decipher.update(code, 'hex', 'utf8')
             dec += decipher.final('utf8');
             return dec;
         },

         currenttime: function(adddays = 0) {
             var dateTime = new Date();
             currenttime = sails.moment(dateTime).add(adddays, 'd').format("YYYY-MM-DD HH:mm:ss");
             return currenttime;
         },

     };