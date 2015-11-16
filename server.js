"use strict";
const path = require('path');
const express = require('express');

// Server
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html')
});

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, function () {
  console.log("Server is up and running on port: " + PORT)
});

// Socket.IO
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);
  socket.emit('statusMessage', 'You have connected.');

  socket.on('createSchedule', function (schedule) {
    schedules[schedule["url"]] = schedule
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});

let schedules = {
};