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

io.on('connection', (socket) => {
    const name = 'U' + (socket.id).toString().substr(1, 4);
    socket.broadcast.emit('ADD_CONTACT', {
        id: socket.id, 
        avatarUrl: '', 
        name: name
    });

    socket.emit('SOCKET_CONNECTED', {
        id: socket.id, 
        avatarUrl: '', 
        name: name
    });
    
    logger.info(name + ' connected to chat');
});



