let socket = io();
let label = $('small');
let searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('el escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text("Escritorio " + escritorio);

$('button').on('click', function() {
    //nombre de la funcion a llamar    parametros          funcion a realizar
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === "no hay tickets") {
            label.text("no hay tickets");
            alert(res);
            return;
        }
        label.text("TICKET " + res.numero);
    });
})