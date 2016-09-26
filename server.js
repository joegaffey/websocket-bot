var SerialPort = require('serialport');
var express = require('express');
var app = express();

const SERVER_PORT = 8080;

if(process.argv[2])
	var portString = process.argv[2];

if(process.argv[3]) {
	var sp = new SerialPort(portString, { parser: SerialPort.parsers.readline('\n'), baudRate: parseInt(process.argv[3]) });
	sp.on('data', function(data) {
		socketServer.emit('distance', data);
	});
}

app.use(express.static(__dirname + '/public'));

var server = app.listen(SERVER_PORT);
var io = require('socket.io');
var socketServer = io(server);
console.log('Waiting for connections...');

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
