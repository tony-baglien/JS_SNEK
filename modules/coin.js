export default class Coin {
  constructor(game, snek) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.snek = snek;

    this.radius = 15;

    this.reset();
  }

  randomPosition10() {
    let randomInt = () => {
      return Math.floor(
        Math.random() * (this.gameHeight - this.radius * 2) + this.radius * 2
      );
    };
    return randomInt();
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
      this.position.x < this.snek.position.x + this.snek.width &&
      this.position.x + this.radius * 2 > this.snek.position.x &&
      this.position.y < this.snek.position.y + this.snek.height &&
      this.position.y + this.radius * 2 > this.snek.position.y
    ) {
      this.position.x = this.randomPosition10();
      this.position.y = this.randomPosition10();
      this.snek.eat();
    }
  }
}
