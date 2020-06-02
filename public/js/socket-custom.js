let socket = io();
//los on son para escucar 
socket.on('connect', function() {
    console.log("conectado al servidor");
});

socket.on('disconnect', function() {
    console.log("perdimos la conexion con el servidor");
});

// los emit son para enviar informacion
socket.emit('enviarMensaje', {
    usuario: "Boris",
    mensaje: "hola mundo"
}, function(resp) {
    console.log("respuesta server  ", resp);
});

//es para eescucar informacion
socket.on('enviarMensaje', function(data) {
    console.log("servidor: ", data);
});