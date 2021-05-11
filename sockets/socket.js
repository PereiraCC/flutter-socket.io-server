
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('ColdPlay'));
bands.addBand(new Band('Amber Run'));
bands.addBand(new Band('Twenty-one pilots'));
bands.addBand(new Band('Imagine Dragons'));


//Mensajes de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    //Obtener todas las bandas
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    //Escuchar un mensaje Pruebas
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload)

        //Emitir un mensaje
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    // client.on('emitir-mensaje', (payload) => {
    //     //emite a todos
    //     //io.emit('nuevo-mensaje', payload); 

    //     //emite a todos menos el que lo emitio
    //     client.broadcast.emit('nuevo-mensaje', payload); 
    // });

    //Votar por una banda
    client.on('vote-band', (payload) => {

        //console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());

    });

    //Agregar una banda
    client.on('add-band', (payload) => {

        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());

    });

    //Eliminar una banda
    client.on('delete-band', (payload) => {

        bands.delete(payload.id);
        io.emit('active-bands', bands.getBands());

    });

});