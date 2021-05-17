export default class Coin {
  constructor(game, snek, body) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.snek = snek;
    this.body = body;

    this.radius = 10;

    this.reset();
  }

  randomPosition10() {
    let randomInt = () => {
      return Math.floor(
        Math.random() * (this.gameHeight / 10 - this.radius / 10 + 1) +
          this.radius / 10
      );
    };
    return randomInt() * 10;
  }

  reset() {
    this.position = { x: this.randomPosition10(), y: this.randomPosition10() };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  update(deltaTime) {
    if (
      this.position.x > this.snek.position.x &&
      this.position.x < this.snek.position.x + this.snek.width &&
      this.position.y > this.snek.position.y &&
      this.position.y < this.snek.position.y + this.snek.height
    ) {
      this.position.x = this.randomPosition10();
      this.position.y = this.randomPosition10();
      this.body.grow();
    }
  }
}
