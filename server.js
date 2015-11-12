const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html')
});

const PORT = process.env.PORT || 8080
const server = http.createServer(app)
                .listen(PORT, function () {
                  console.log("Server is up and running on port: " + PORT)
                });

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});