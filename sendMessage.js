
var authToken = "346a786fda8c475ba4d4afbfacb460bf";
var accountSid = 'AC55685092d2d9bbdf359d84a548c70775';
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
        from: "1863514160" // cambiar este número
    }, function(err, sms) {
        if(err){
          reject({error: err, ok: false});
          return;
        }
        resolve({ok: true, response: sms});

    });
  })
}