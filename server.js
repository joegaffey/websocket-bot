var portString = process.argv[2];
var SerialPort = require('serialport');
var sp = new SerialPort(portString, { parser: SerialPort.parsers.readline('\n'), baudRate: 115200 });

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var server = app.listen(8080);
var io = require('socket.io');
var socketServer = io(server);

socketServer.on('connection', openSocket);
socketServer.on('disconnect', closeSocket);

function openSocket(socket){
	console.log('New client: ' + socket.handshake.address);

	socket.on('message', function(data) {
    console.log('Received from client: ' + data);
    sp.write(data);
    console.log('Sent to robot: ' + data);
	});
}

function closeSocket() {
  console.log('Client disconnected: ' + socket.handshake.address);
}

sp.on('data', function(data) {
	console.log('Recevied from robot: ' + data);
	socketServer.emit('distance', data);
  console.log('Sent to client: ' + data);
});

// setInterval(function() {
//   socketServer.emit('distance', Math.random() * 100);
// }, 1000 );
