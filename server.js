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
		/*
		if(data.startsWith("007"))
      data ='42#OK';
    else {
      data ='OK';
    }
    socket.emit('message', data);
		*/

    sp.write(data);
    console.log('Sent: ' + data);
	});

	sp.on('data', function(data) {
    console.log('Recevied: ' + data);
		socket.emit('message', data);
	});
}

function closeSocket() {
  console.log('Client disconnected: ' + socket.handshake.address
}
