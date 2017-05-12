require('./db.js');

module.exports.createObjectWithName = function (coleccion, v1, v2, v3, v4) {
	var obj = null;

	if (coleccion == 'Usuario') {
		obj = new Usuario({ nombre: v1, apellido: v2, telefono: v3, id: v4 });
	}
	return obj;
}

module.exports.findCollectionByName = function (name) {
	var objeto = null;

	if (name === 'Usuario') {
		objeto = Usuario;
	}
	return objeto;
}

module.exports.updateData = function (name, key, data, service) {
	if (name === 'Usuario') {
		Usuario.update({ _id: key }, data, { upsert: true }, respuesta);
	}

	function respuesta(err) {
		if (err) {
			return service.json({ status: "fail", name: name, description: "ID_OBJECT_DONT_EXIST", value: [{}] });
		}
		else {
			return service.json({ status: "ok", name: name, description: "COLLECTION_QUERY_OK", value: key });
		}
	}
}