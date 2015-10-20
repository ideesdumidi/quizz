/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('./config/environment');
var autoIncrement = require('mongoose-auto-increment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
autoIncrement.initialize(mongoose.connection);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

//Lets require/import the HTTP module
var server = require('http').createServer(handleRequest);
var fs = require('fs');
var io = require('socket.io')(server);

//We need a function which handles requests and send response

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Lets start our server
server.listen(config.port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", config.port);
});

var dispatcher = require('httpdispatcher');

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');
dispatcher.setStaticDirname('./app');

//A sample GET request    
dispatcher.onGet("/", function(req, res) {
    fs.readFile(__dirname + '/app/index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

require('./config/socketio')(io);
io.on('connection', function (socket) {
  socket.emit('connected');
});