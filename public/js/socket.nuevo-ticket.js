///comando para establecer la comunicacion

let socket = io();
let label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log("conectado al servidor ");
});

socket.on('disconnect', function() {
    console.log("Desconectado del servidor");
});
//el on es para escuchar 
socket.on('estadoActual', function(res) {
    label.text(res.actual);
});


$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(ticket) {
        label.text(ticket);
    });
});