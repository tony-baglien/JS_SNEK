export default class Body {
  constructor(game, snek) {
    this.game = game;
    this.snek = snek;

    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.height = snek.height;
    this.width = snek.width;

    this.waitTime = 50;

    this.reset();
  }

  reset() {
    this.currentSpeed = this.snek.currentSpeed;
    this.maxSpeed = this.snek.maxSpeed;

    this.position = [];

    for (let i = 1; i < 4; i++) {
      this.position.push({
        x: this.snek.position.x + this.width * i,
        y: this.snek.position.y,
      });
    }
  }

  draw(ctx) {
    this.ctx = ctx;
    this.position.forEach((part) => {
      this.ctx.strokeRect(part.x, part.y, this.height, this.width);
    });
  }
  grow() {
    this.position.unshift({
      x: this.snek.position.x + this.width * (this.position.length + 1),
      y: this.snek.position.y,
    });
  }

  moveLeft() {
    this.position.forEach((part, index) => {
      setTimeout(() => {
        part.x = this.snek.position.x + this.width * (index + 1);
        part.y = this.snek.position.y;
      }, this.waitTime * index);
    });
  }

  moveRight() {
    this.position.forEach((part, index) => {
      this.ctx.strokeRect(part.x, part.y, this.width, this.height);
      setTimeout(() => {
        part.x = this.snek.position.x - this.width * (index + 1);
        part.y = this.snek.position.y;
      }, this.waitTime * index);
    });
  }

  moveUp() {
    this.position.forEach((part, index) => {
      setTimeout(() => {
        part.x = this.snek.position.x;
        part.y = this.snek.position.y + this.height * (index + 1);
      }, this.waitTime * index);
    });
  }

  moveDown() {
    this.position.forEach((part, index) => {
      setTimeout(() => {
        part.x = this.snek.position.x;
        part.y = this.snek.position.y - this.height * (index + 1);
      }, this.waitTime * index);
    });
  }

  update(deltaTime) {
    this.position.forEach((part) => {
      part.x += this.currentSpeed.x;
      part.y += this.currentSpeed.y;

      if (part.y + this.height < 0) part.y = this.gameHeight;

      if (part.y > this.gameHeight) {
        part.y = -this.height;
      }

      if (part.x + this.width < 0) part.x = this.gameWidth;

      if (part.x > this.gameWidth) {
        part.x = -this.width;
      }
    });
  }
}
