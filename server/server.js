const express = require('express');
const path = require('path');
const app = express();
const colors = require("colors");
const socketIO = require("socket.io");
const http = require("http");

let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);
    let mensaje = `Servidor corriendo en puerto ${ port }`;
    console.log(mensaje.yellow);

});