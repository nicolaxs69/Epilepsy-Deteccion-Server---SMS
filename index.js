
let express = require('express');
let bodyParser = require('body-parser');
let getFamilyNumbers = require('./getFamilyNumbers');
let sendMessage = require('./sendMessage');

let app = express();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({})); // para entender las peticiones con body

var service = require('./service.js');

function CORS(req, res, next) {
  res.status(200);
  res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

/**
 * Al hacer un POST a esta ruta 
 * con los parámetros to y msg en JSON, se envía
 * un mensaje de texto con twilio
 * Ej: localhost:5000/send  body: {"to":"+57(numero)","msg":"blablabla"}
 */
app.post('/send', function (req, res) {

  //Validar parametros
  if (!req.body.to || !req.body.msg) {
    res.json({ ok: false, error: "Missing parameters msg or to" })
    return;
  }
  // enviar el mensaje
  sendMessage(req.body.to, req.body.msg).then(response => {
    res.json(response);
  })
    .catch(e => {
      res.json(e);
    });
});

/**
 * Al hacer un POST a esta ruta 
 * con los parámetros uid,lat,long en JSON, se envía
 * un mensaje de texto con twilio a los familiares.
 * Ej: localhost:5000/send  body: {"uid":"1","lat":"3.4323","long":"-76.567"}
 */

app.post('/attack', function (req, res) {

  if (!req.body.uid || !req.body.lat || !req.body.long) {
    res.json({ ok: false, error: "Missing some parameter" })
    return;
  }

  getFamilyNumbers(req.body.uid, req.body.lat, req.body.long).then((numbers = []) => {

    // enviarle un mensaje a cada numero
    let promisesMensajes = [];

    // enviar todos los mensajes
    numbers.forEach(number => {
      //Original
      //let promiseMensaje = sendMessage(number, 'Tu familiar está teniendo un ataque');

      //Propuesta   http://maps.google.com/maps?z=12&t=m&q=loc:38.9419+-78.3020
      let promiseMensaje = sendMessage(number, 'Tu familiar está teniendo un ataque en la Ubicacion: ' + 'http://maps.google.com/maps?z=12&t=m&q=loc:' + req.body.lat + '+' + req.body.lat);

      promisesMensajes.push(promiseMensaje);
    });

    // Aqui se espera a que todos los mensajes se envíen
    Promise.all(promisesMensajes)
      .then((data) => {
        res.json({ ok: true, data });
      })
      .catch(e => {
        res.json({ ok: false, error: e })
      });

  })

});

/**
 * FULL API REST con CRUD (Create,Read,Update,Delete) para MongoDB y MongoLab 
 */

app.all('/*', CORS);                                                     // Ejemplos
app.get('/create/:collection/:v1/:v2/:v3/:v4', CORS, service.create);     //http://localhost:5000/create/Usuario/Nicolas/Escobar/+573122336858/1
app.get('/read/:collection', CORS, service.read);                         //http://localhost:5000/read/Usuario
app.get('/read/:collection/:param/:value', CORS, service.readX);          //http://localhost:5000/read/Usuario/nombre/Nicolas
app.get('/update/:collection/:v1/:v2/:v3/:v4/:id', CORS, service.update); //http://localhost:5000/update/Usuario/Nicolas/Escobar/nicolaxs69/1/591492f9c9984f19e8e60272
app.get('/delete/:collection/:param/:value', CORS, service.delete);
app.post('/', CORS, service.post);

app.listen(process.env.PORT || 5000, function () {
  console.log('Server running');
})