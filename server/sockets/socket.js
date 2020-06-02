const { io } = require('../server');

io.on('connection', (client) => {
    console.log("usuario conectado");
    client.emit('enviarMensaje', {
        usuario: "admin",
        mensaje: "hola te saluda el administrador"
    });


    client.on('disconnect', () => {
        console.log("usuario desconectado");
    });


    //escuchar el cliente
    client.on('enviarMensaje', (data, callback1) => {
        console.log(data);

        client.broadcast.emit('enviarMensaje', data);
        // if (mensaje.usuario) {
        //     callback1({
        //         resp: "todo salio bien "
        //     });
        // } else {
        //     callback1({
        //         resp: "todo salio mal"
        //     });
        // }


    });
});