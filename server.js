const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const log4js = require('log4js');
const logger = log4js.getLogger();
const path = require('path');
const config = require('./config.js');

logger.level = 'debug';

const port = config.port;
server.listen(port);

logger.debug('Server has been started... ', port);

app.use(express.static(__dirname + config.staticPath));

app.get('*', (request, response) => {
    const {appPath, indexFile} = config;
    response.sendFile(path.resolve(__dirname, appPath, indexFile));
});

let contacts = [],
    messages = [];

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
    logger.info(contact.name + ' connected to chat');

    socket.broadcast.emit('ADD_CONTACT', contact);
    socket.emit('SOCKET_CONNECTED', contact);
    socket.emit('RECEIVE_CONTACT_LIST', contacts);

    contacts.push(contact);
    
    socket.on('disconnect', (reason) => {
        const {id} = socket;
        contacts = contacts.filter(contact => contact.id !== id);
        socket.broadcast.emit('DELETE_CONTACT', {id});

        logger.info(id + ' disconnected from chat');
    });

    socket.on('SEND_MESSAGE', (text) => {
        logger.info('Message receive with text ', text);
        const message = {
            id: new Date().getTime() + 1,
            author: contact.name,
            text
        }

        socket.emit('RECEIVE_MESSAGE', message);
        socket.broadcast.emit('RECEIVE_MESSAGE', message);
    })
});



