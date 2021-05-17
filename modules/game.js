import Snek from './snek.js';
import Body from './part.js';
import Coin from './coin.js';
import InputHandler from './input.js';

export default class GAME {
  constructor(gameHeight, gameWidth) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;

    this.snek = new Snek(this);
    this.body = new Body(this, this.snek);
    this.coin = new Coin(this, this.snek, this.body);

    new InputHandler(this.snek, this.body);
  }

  draw(ctx) {
    this.snek.draw(ctx);
    this.coin.draw(ctx);
    this.body.draw(ctx);
  }
  update() {
    this.snek.update();
    this.coin.update();
    this.body.update();
  }
}
