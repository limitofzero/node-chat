const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const log4js = require('log4js');
const logger = log4js.getLogger();

const port = 8080;
server.listen(port);

logger.debug('Servar has been started...');

app.use(express.static(__dirname + '/dist'));

