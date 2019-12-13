const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// database connection
mongoose.connect('mongodb://localhost/chat-database')
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(3000, () => {
    console.log('server on port ', app.get('port'));
});