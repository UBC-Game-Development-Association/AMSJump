module.exports = class Player{
    constructor(id, username, start) {
        this.xPos = start.x;
        this.yPos = start.y;
        this.width = 100;
        this.height = 100;
        this.speedX = 0;
        this.speedY = 0;
        this.readyL = 0;
        this.readyR = 0;
        Player.list = {};
    }

    releaseJump (dir) {
        this.speedX += this.readyR;
        this.speedX += this.readyL;
        this.speedY = 2*(this.readyL + this.readyR);
        this.readyL = 0;
        this.readyR = 0;
    }

    updatePlayer() {
        if(this.readyL > 0){
			this.readyL += 0.5;
		}
		if(this.readyR > 0){
			this.readyR += 0.5;
		}

		this.xPos += this.speedX;
		this.yPos += this.speedY;
		
		
		if(this.yPos > 0){
			this.speedY = this.speedY - 0.5;
		}else{
			this.speedX = 0;
			this.speedY = 0;
			this.yPos = 0;
		}
	
		var selfPack = {
			x:this.xPos,
			y:this.yPos,
		}
		
		return selfPack;
    }

    jumpIn (dir) {
        if(dir == 'right'){
			this.readyR = 1;
		}else{
			this.readyL = 1;
		}
    }
}