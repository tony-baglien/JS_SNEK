import Snek from './snek.js';
import Coin from './coin.js';
import InputHandler from './input.js';

export default class GAME {
  constructor(gameHeight, gameWidth) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;

    this.snek = new Snek(this);
    this.coin = new Coin(this, this.snek);

    new InputHandler(this.snek);
  }

  draw(ctx) {
    this.snek.draw(ctx);
    this.coin.draw(ctx);
  }
  update() {
    this.snek.update();
    this.coin.update();
  }
}
