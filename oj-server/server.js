const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const restRouter = require('./routes/rest');
const http = require('http');
const socketIO = require('socket.io');
const io = socketIO();
const editorSocketService = require('./services/editorSocketService')(io);

mongoose.connect("mongodb://user:password@ds119020.mlab.com:19020/coj");

// if the url matches '/api/v1/, it will use restRouter to handle the traffic
app.use('/api/v1', restRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../public')})
});

//app.listen(3000, () => console.log('Example app listening on port 3000!'));

// connect io with server
const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);
// listening call back
function onListening() {
    console.log('App listening on port 3000!')
}