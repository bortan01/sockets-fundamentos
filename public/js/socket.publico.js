let socket = io();
let lblTicket1 = $("#lblTicket1");
let lblTicket2 = $("#lblTicket2");
let lblTicket3 = $("#lblTicket3");
let lblTicket4 = $("#lblTicket4");

let lblEscritorio1 = $("#lblEscritorio1");
let lblEscritorio2 = $("#lblEscritorio2");
let lblEscritorio3 = $("#lblEscritorio3");
let lblEscritorio4 = $("#lblEscritorio4");

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorio = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', function(data) {
    //  console.log(data);
    actualizaHTMl(data.ultimos4);
});

socket.on('ultimos4', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTMl(data.ultimos4);
});

function actualizaHTMl(ultimos4) {
    for (let index = 0; index < ultimos4.length; index++) {
        lblTickets[index].text('ticket ' + ultimos4[index].numero);
        lblEscritorio[index].text('escritorio ' + ultimos4[index].escritorio);

    }
}