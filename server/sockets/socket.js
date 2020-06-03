////servidor
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();


io.on('connection', (client) => {
    console.log("usuario conectado");
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = (`el siguiente ticket es ${ticketcontrol.siguiente()}`);
        console.log(siguiente);
        callback(siguiente);
    });
    ///emitir un evento llamado estadoActual debe de retornar el ultimo ticket
    //emir es para crear un
    client.emit('estadoActual', {
        actual: ticketcontrol.getUltimoTicket(),
        ultimos4: ticketcontrol.getUltimos4Ticket()
    });

    //para estar escuchando un evento 
    client.on('atenderTicket', (data, tarea) => {
        if (!data.escritorio) {
            return tarea({
                err: true,
                mensaje: "el escritorio es necesario"
            });
        }
        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);
        // console.log("atender ticket es " + atenderTicket);
        tarea(atenderTicket);

        //actualizar y notificar cambios en los ultimos cuatro
        //emitir ultimos cuatro
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketcontrol.getUltimos4Ticket()
        });
    });



});