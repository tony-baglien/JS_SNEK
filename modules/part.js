export default class Body {
  constructor(game, snek) {
    this.game = game;
    this.snek = snek;

    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.height = snek.height;
    this.width = snek.width;

    this.x = 0;
    this.y = 0;

    this.total = 0;

    // this.waitTime = 50;

    this.reset();
  }

  reset() {
    this.currentSpeed = this.snek.currentSpeed;
    this.maxSpeed = this.snek.maxSpeed;
    this.tail = [];
  }

  draw(ctx) {
    for (let i = 0; i < this.tail.length; i++) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  eat() {
    this.total += 1;
  }

  //first draft of growing It works, but does not make the 'trail' like a snake game
  // grow() {
  //   this.position.unshift({
  //     x: this.snek.position.x + this.width * (this.position.length + 1),
  //     y: this.snek.position.y,
  //   });
  // }

  // moveLeft() {
  //   this.position.forEach((part, index) => {
  //     setTimeout(() => {
  //       part.x = this.snek.position.x + this.width * (index + 1);
  //       part.y = this.snek.position.y;
  //     }, this.waitTime * index);
  //   });
  // }

  // moveRight() {
  //   this.position.forEach((part, index) => {
  //     this.ctx.strokeRect(part.x, part.y, this.width, this.height);
  //     setTimeout(() => {
  //       part.x = this.snek.position.x - this.width * (index + 1);
  //       part.y = this.snek.position.y;
  //     }, this.waitTime * index);
  //   });
  // }

  // moveUp() {
  //   this.position.forEach((part, index) => {
  //     setTimeout(() => {
  //       part.x = this.snek.position.x;
  //       part.y = this.snek.position.y + this.height * (index + 1);
  //     }, this.waitTime * index);
  //   });
  // }

  // moveDown() {
  //   this.position.forEach((part, index) => {
  //     setTimeout(() => {
  //       part.x = this.snek.position.x;
  //       part.y = this.snek.position.y - this.height * (index + 1);
  //     }, this.waitTime * index);
  //   });
  // }

  update(deltaTime) {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = {
      x: this.x,
      y: this.y,
    };

    this.x = this.snek.position.x + this.currentSpeed.x;
    this.y = this.snek.position.y + this.currentSpeed.y;

    //Endless Border Code
    if (this.y + this.height < 0) this.y = this.gameHeight;

    if (this.y > this.gameHeight) {
      this.y = -this.height;
    }

    if (this.x + this.width < 0) this.x = this.gameWidth;

    if (this.x > this.gameWidth) {
      this.x = -this.width;
    }
  }
}
