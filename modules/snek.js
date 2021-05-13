export default class Snek {
    constructor(game) {
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;


        this.height = 30;
        this.width = 30;
        this.reset();
    }

    reset(){
        this.currentSpeed = {x: 0, y: 0};
        this.maxSpeed = 5;

        this.position = {x: 200, y: 50}
        
    }
    
    draw(ctx) {
        ctx.strokeRect(this.position.x,this.position.y,this.height,this.width)
    }

    moveRight() {
        this.currentSpeed.x = this.maxSpeed;
    }
    moveLeft() {
        this.currentSpeed.x = -this.maxSpeed;
    }
    moveUp() {
        this.currentSpeed.y = this.maxSpeed;
    }
    moveDown() {
        this.currentSpeed.y = -this.maxSpeed;
    }
    stop() {
        this.currentSpeed.x = 0;
        this.currentSpeed.y = 0;
    }


    update(deltaTime) {

        this.position.x += this.currentSpeed.x;
        this.position.y += this.currentSpeed.y;

        if(this.position.y + this.height < 0)  this.position.y = this.gameHeight

        if(this.position.y > this.gameHeight) {
            this.position.y = -this.height
        }

        if (this.position.x + this.width < 0) this.position.x = this.gameWidth

        if (this.position.x > this.gameWidth) {
            this.position.x = -this.width
        }
        
            
        }
    }
