const path = require('path');
const express = require('express');
const socket = require('socket.io');
const emitter = require('./button-control');
const buttonEventEmitter = emitter.buttonEventEmitter;
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
routes(app);

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/index.html'), {
        headers: {
            'Content-Type': 'text/html',
        }
    });
});

app.use('/assets/', express.static(path.resolve(__dirname, 'public')));
app.use('/assets/', express.static(path.resolve(__dirname, 'node_modules/socket.io-client/dist')));

const server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});
const io = socket(server);


io.on('connection', (socket) => {
    console.log('Made socket connection', socket.id);
    if (socket) {
        buttonEventEmitter.on('event', (event, value) => {
            emitEvent(event, value)
        })
    ;}
});

function emitEvent(event, value) {
    io.sockets.emit('output',  {
        event,
        value
    });
}

