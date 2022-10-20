//Got the packages (in the form of objects)
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var fs = require('fs');

//Send the user the 'index.html' file, to let them interact
app.get('/',function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//If its the mirror, send the mirror file.
app.get('/mirror',function(req, res){
	res.sendFile(__dirname + '/mirrorIndex.html');
});

app.use('/client', express.static(__dirname + '/client'));


//Start the server on a port
serv.listen(8012);
console.log("Server started.");

//A list to track all of the sockets
var SOCKET_LIST = {};

//Creating the io object (to help us talk with the sockets)
var io = require('socket.io')(serv,{});

//Setting up what to do when someone connects
io.sockets.on('connection', function(socket){
    
    //Give it an ID and add it to the list
	//console.log('socket connection');
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
    
    //Determine what to do when it disconnects
    socket.on('disconnect', function(){
        
		delete SOCKET_LIST[socket.id];
	});
	
	socket.on('test', function(data){
       console.log(data.message);
	   socket.emit('response', {});
    });
    
});


	//Every so often, update the board
	setInterval(function(){
	
	
		for(var i in SOCKET_LIST){
		
        
			var socket = SOCKET_LIST[i];
		
			socket.emit('response', {});
		}
	}, 1000/65);


