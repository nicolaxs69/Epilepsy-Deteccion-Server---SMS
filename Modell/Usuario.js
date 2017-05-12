var Schema = require('mongoose').Schema;

var Usuario = new Schema({
	telefono: {
		type: String,
		required: true,
		maxlength: 140
	},
	id: {
		type: String,
		required: true,
		maxlength: 8
	},
	nombre: String,
	apellido: String
});


module.exports = Usuario;