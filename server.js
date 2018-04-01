const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const log4js = require('log4js');
const logger = log4js.getLogger();

logger.level = 'debug';

const port = 8080;
server.listen(port);

logger.debug('Server has been started...');
app.use(express.static(__dirname + '/dist'));

let contacts = [];

const getNewContact = (sockId) => {
    const name = 'U' + (sockId).toString().substr(1, 4);

    const contact = {
        id: sockId, 
        avatarUrl: '', 
        name
    };

    return contact;
} 

io.on('connection', (socket) => {
    const contact = getNewContact(socket.id);
    contacts.push(contact);
    logger.info(contact.name + ' connected to chat');

    socket.broadcast.emit('ADD_CONTACT', contact);
    socket.emit('SOCKET_CONNECTED', contact);
    socket.emit('RECEIVE_CONTACT_LIST', contacts);
    
    socket.on('disconnect', (reason) => {
        contacts = contacts.filter(contact => contact.id !== socket.id);
        socket.broadcast.emit('DELETE_CONTACT', {id: socket.id});

        logger.info(socket.id + ' disconnected from chat');
    });
});



