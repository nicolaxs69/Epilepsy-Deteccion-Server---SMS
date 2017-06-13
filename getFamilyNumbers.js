var factory = require('./factory.js');

/***
 * @param {string} uid
 * @param {string} lat
 * @param {string} lon
 * @return {Promise<any[]>}
 */

function getFamilyNumbers(uid, lat, lon) {
  return new Promise((resolve, reject) => {


    //var tabla = request.params.collection;
    var tabla = 'Usuario';
    var param = 'id';
    var value = uid;

    var object = factory.findCollectionByName(tabla);
    var existe = false;

    if (object !== null) {
      existe = true;
    }

    if (existe == true) {
      object.find().where(param).equals(value).exec(buscarDatos);
    }

    else {
      //return response.json({ status: "fail", name: tabla, description: "COLLECTION_DONT_EXIST", value: [{}] });
      console.log("COLLECTION_DONT_EXIST");
    }

    function buscarDatos(err, items) {
      if (err) {
        //return response.json({ status: "fail", name: tabla, description: "COLLECTION_BAD_QUERY", value: [{}] });
        console.log("COLLECTION_BAD_QUERY");

      }
      else {
        //return response.json({ status: "ok", name: tabla, description: "COLLECTION_QUERY_OK", value: items });
        //console.log(items);
        resolve([items[0].telefono, items[1].telefono, items[2].telefono]);
        

      }
    }

    // acá te conectás a la base de datos 
    // y retornás los números de la familia

    //resolve(['+573014203939', '+573017001358']);
  });
}

module.exports = getFamilyNumbers;