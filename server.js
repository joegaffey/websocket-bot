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

	socket.on('action', function(data) {
    sp.write(data  + '\n');
    console.log('Sent to robot: ' + data);
	});
}

function closeSocket() {
  console.log('Client disconnected: ' + socket.handshake.address);
}

sp.on('data', function(data) {
	socketServer.emit('distance', data);
});
