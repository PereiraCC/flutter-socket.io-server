
const { io } = require('../index')

//Mensajes de Sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    //Escuchar un mensaje
    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload)

        //Emitir un mensaje
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });
});