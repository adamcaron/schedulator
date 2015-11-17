"use strict";
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const crypto = require('crypto');

const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080
http.listen(PORT, function () {
  console.log("Server is up and running on port: " + PORT)
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const schedules = {};

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/schedules/:id/:dashboard', function (req, res) {
  let schedule = schedules[req.params.id];
  // let pry = require('pryjs');eval(pry.it)
  res.sendFile(__dirname + '/public/dashboard.html')
  // res.render(`<html><body>
  //     <h1>Schedule Dashboard</h1>
  //     <h2>Manage Schedule #${schedule.id}</h2>
  //   </body></html>`);
});

app.post('/schedules/new', function (req, res) {
  let schedule          = req.body.schedule;
  let id                = crypto.randomBytes(20).toString('hex')

  schedule.id           = id;
  schedule.url          = '/schedules/' + id;
  schedule.dashboardUrl = schedule.url + '/' + crypto.randomBytes(20).toString('hex');

  schedules[id]         = schedule;
  res.redirect(schedule.dashboardUrl);
});

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);
  socket.emit('statusMessage', 'You have connected.');

  // socket.on('createSchedule', function (schedule) {
  //   let id = schedule["url"]
  //   schedules[id] = schedule
  // });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
  });
});
