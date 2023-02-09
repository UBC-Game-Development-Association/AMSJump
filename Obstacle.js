var Obstacle = function(data){
	
	var self = {
		xPos: data.xPos,
		yPos: data.yPos,
		width: data.width,
		height: data.height,
	}
	self.getData = function(){
		return {xPos:self.xPos, yPos:self.yPos, width:self.width, height:self.height};
	}
	
	return self;
}

module.exports = Obstacle;