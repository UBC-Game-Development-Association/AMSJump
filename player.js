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
        if(this.yPos === 0){
            this.speedX += this.readyR;
            this.speedX += this.readyL;
            this.speedY = 2*(this.readyL + this.readyR);
            this.readyL = 0;
            this.readyR = 0;
        }
    }

    updatePlayer() {
        if((this.readyL>0) && (self.readyL<8.5)){
            this.readyL = this.readyL + (0.6/(this.readyL*2));
        }
		if((this.readyR>0) && (self.readyR<8.5)){
            this.readyR = this.readyR + (0.6/(this.readyR*2));
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
            readyR: this.readyR,
            readyL: this.readyL
		}
		
		return selfPack;
    }

    jumpIn (dir) {
        if(this.yPos == 0){
            if(dir == 'right'){
                this.readyR = 1;
            }else{
                this.readyL = 1;
            }
        }
    }
}