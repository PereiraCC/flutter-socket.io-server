
//Importanciones
const express = require('express');
const path = require('path');
require('dotenv').config();

//App el express
const app = express();


//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



//Path publico
const publicPath = path.resolve(__dirname, 'public');

//Usamos el path
app.use(express.static(publicPath));

//Metodo de inicio o de escucha
server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});