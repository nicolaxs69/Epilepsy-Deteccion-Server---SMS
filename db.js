// MongoDB Connection 

var mongoose = require('mongoose');


/* 
db_url = 'localhost/LoginService';
db = mongoose.createConnection(db_url);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
 console.log("MongoDB connected!");
});
*/
//*
mongoose.connect('mongodb://nicolaxs69:legolas4129@ds139791.mlab.com:39791/login_service');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('MongoLab connected!');
});
//*/
var schema_Usuario = require('./Modell/Usuario.js');
Usuario = db.model('Usuario', schema_Usuario);

module.exports = db;
module.exports = mongoose;