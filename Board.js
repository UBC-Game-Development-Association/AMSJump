/*
* Create a new object to hold all of the game state data.
*/
var Board = function(){
	var self = {};
	
}


Board.obstList = {};

/*
* Lets update the board (ie make it go up, track its state)
* Returns a pack with game in
fo.
*/
Board.Update = function(){
	var boardPack = [];
	
	for(var i in Board.obstList){
		boardPack.push(Board.obstList[i].getData());
	}
	
	return boardPack;
}




//If obj1 is above 2, returns 'd', if 2 is above 1 'u', if they dont collide return n.
Board.isColliding = function(obj1, obj2){
	if((obj1.y + obj1.height > obj2.y) && (obj1.y < obj2.y + obj2.height)){
		if((obj1.x + obj1.width > obj2.x) && (obj1.x < obj2.x + obj2.width)){
			if(obj1.y > obj2.y){
				return 'd';
			}
			else{
				return 'u';
			}
		}
	}
	return 'n';
}

module.exports = Board;