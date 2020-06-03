const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('./../data/data.json');
        this.Arreglotickets = [];
        this.ultimos4 = [];
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.Arreglotickets = data.Arreglotickets;
            this.ultimos4 = data.ultimos4;

        } else {

            this.reiniciarConteo();
        }
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.Arreglotickets.push(ticket);
        this.grabarArchivi();
        return `ticket ${this.ultimo}`;
    }
    getUltimoTicket() {
        return `ticket ${this.ultimo}`;
    }

    getUltimos4Ticket() {
        return this.ultimos4;
    }
    atenderTicket(escritorio) {
        if (this.Arreglotickets.length === 0) {
            return 'no hay tickets'
        }
        let numeroTicket = this.Arreglotickets[0].numero;
        this.Arreglotickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            console.log("se va a elimiar uno ");
            this.ultimos4.splice(-1, 1); //borra el ultimo
        }
        //console.log("ultimos cuatro");
        console.log(this.ultimos4);
        this.grabarArchivi();
        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.Arreglotickets = [];
        this.ultimos4 = [];
        console.log("se ha inicializado el sistema");
        this.grabarArchivi();


    }
    grabarArchivi() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            Arreglotickets: this.Arreglotickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}


module.exports = { TicketControl }