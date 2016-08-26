# web-bot

Simple node script to control a robot (e.g. [psychotron](https://github.com/joegaffey/psychotron)) via WebSockets.

## Installation
* Clone or download the repo
* cd into websocket-bot folder
* Install the dependencies:
```javascript
npm install express socket.io serialport
```
* Run the server
```javascript
node server.js [serial port] [baud rate]
```
