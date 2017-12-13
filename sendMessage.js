
var authToken = "631084d6187c31342e0a680d89fbcc92";
var accountSid = 'ACa66229a82921e623d80c35a95dd5b507';
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
        from: "+15005550006" // cambiar este número
    }, function(err, sms) {
        if(err){
          reject({error: err, ok: false});
          return;
        }
        resolve({ok: true, response: sms});

    });
  })
}