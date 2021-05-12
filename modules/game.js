import Snek from './snek.js'
import InputHandler from './input.js'


export default class GAME {
    constructor(gameHeight, gameWidth) {
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;

        this.snek = new Snek(this);

        new InputHandler(this.snek)
    }

    draw(ctx) {
        this.snek.draw(ctx)
    }
    update() {
        this.snek.update();
    }
}
