var mongoose = require('mongoose'),
db_url = 'localhost/LoginService';
db = mongoose.createConnection(db_url);

var schema_Usuario = require('./Modell/Usuario.js');
Usuario = db.model('Usuario', schema_Usuario);

module.exports=db;
module.exports=mongoose;