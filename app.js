//Got the packages (in the form of objects)
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var fs = require('fs');

var Player = require('./player.js');
var Queue = require('./queue.js');

var Obstacle = require('./Obstacle.js');
var Board = require('./Board.js');

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

var que = new Queue();

//A list to track all of the sockets
var SOCKET_LIST = {};

//Creating the io object (to help us talk with the sockets) web sockets, fast connection 
var io = require('socket.io')(serv,{});




//Setting up what to do when someone connects
io.sockets.on('connection', function(socket){
    
    //Give it an ID and add it to the list
	//console.log('socket connection');
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
    
	
	Player.onConnect(socket);

	Board.obstList[1] = Obstacle({xPos:100, yPos:0, width:10, height:10});
	
	console.log("Connected");
	
    //Determine what to do when it disconnects
    socket.on('disconnect', function(){
        delete Player.list[socket.id];
		delete SOCKET_LIST[socket.id];
	});
	
	socket.on('test', function(data){
       console.log(data.message);
	   socket.emit('response', {});
    });
	
    
});





/*
* Create an object to hold player data.
*/

Player.list = {};
/*
* Update all players here
* Returns a pack of all player info.
*/
Player.Update = function(){
	var playerPack = [];
	
	for(var i in Player.list){
		playerPack.push(Player.list[i].updatePlayer());
	}
	
	return playerPack;
}

Player.onConnect = function(socket){
	var player = new Player(socket.id, "No Name", {x:10, y:200}); 
	
	Player.list[socket.id] = player;
	
	socket.on('jumpStart', function(data){
		player.jumpIn(data.direction);
	});

	socket.on('jumpStop', function(data){
		player.releaseJump(data.direction);
	});
}


//Every so often, update the board
setInterval(function(){
//We need to store the player data.
	var pack = {
		players: Player.Update(),
		obstacles: Board.Update(),
	};
	for(var i in SOCKET_LIST){
		
        
		var socket = SOCKET_LIST[i];
		
		//Create an update function that gives us an update pack, then use that pack.
		socket.emit("update", pack);
	}
}, 1000/65);


