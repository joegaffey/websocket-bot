# websocket-bot

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
* Point your browser to http://[host]:8080/

Note: Requires a modern (HTML5) browser. Tested on Chrome and Firefox. 
Speech features don't currently work on Firefox due to browser limitations.
http://caniuse.com/#feat=speech-synthesis
