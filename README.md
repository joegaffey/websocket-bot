# web-bot

Simple node script to control a robot (e.g. [psychotron](https://github.com/joegaffey/psychotron)) via WebSockets with a [Blockly](https://developers.google.com/blockly/) UI.

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
* Point you browser to [server]:8080/blockly
