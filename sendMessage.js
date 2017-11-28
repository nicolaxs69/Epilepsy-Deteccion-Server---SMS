
var authToken = "d84d95c7c1343303fcd7e1de39010b16";
var accountSid = 'ACc1738e2d185d2d7df5c4b49571bf0385';
let client = require('twilio')(accountSid, authToken);
let yo = "<instertar numero>"

/**
 * @param {string} telephone
 * @param {string} text
 */

module.exports = function(telephone, text){
 
   return new Promise((resolve,reject)=>{
    client.messages.create({
        body: text,
        to: telephone,
        from: "+61428868990" // cambiar este número
    }, function(err, sms) {
        if(err){
          reject({error: err, ok: false});
          return;
        }
        resolve({ok: true, response: sms});

    });
  })
}