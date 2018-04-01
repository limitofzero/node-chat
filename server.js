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

const contacts = [];

io.on('connection', (socket) => {
    const name = 'U' + (socket.id).toString().substr(1, 4);

    const contact = {
        id: socket.id, 
        avatarUrl: '', 
        name: name
    }

    contacts.push(contact);

    socket.broadcast.emit('ADD_CONTACT', contact);
    socket.emit('SOCKET_CONNECTED', contact);
    socket.emit('RECEIVE_CONTACT_LIST', contacts);
    
    logger.info(name + ' connected to chat');
});



