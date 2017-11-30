
var authToken = "ca6dd7220c7f3fb012dfe48ff1baa3eb";
var accountSid = 'AC4270069f8b44baaf951f8f465eaa687e  ';
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