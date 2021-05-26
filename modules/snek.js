import { borderCollision, bodyCollision } from './collision.js';

export default class Snek {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.height = 30;
    this.width = 30;

    this.total = 0;
    this.tail = [];

    this.patterns = [
      ['#FF0000', '#00FF00', '#0000FF'] /*Red Greeen Blue */,
      ['#ff1b8d', '#ffda00', '#1bb3ff'] /*Pink Yellow Blue */,
      ['#ff77ff', '#008080', '#800080'] /*fuscia, teal , purple */,
    ];

    this.reset();
  }

  reset() {
    this.currentSpeed = { x: 0, y: 0 };
    this.scale = 30;
    this.position = { x: 0, y: 0 };
    this.tail = [];
    this.total = 0;
    this.patternSelector = 0;
  }

  patternUpdate() {
    for (let i = 0; i < this.tail.length; i++) {
      let pArray = this.patterns[this.patternSelector];
      if (this.tail.length % 3 === 0) {
        this.currentColor = pArray[0];
      } else if (this.tail.length % 2 === 0) {
        this.currentColor = pArray[1];
      } else {
        this.currentColor = pArray[2];
      }
    }
  }

  eat() {
    this.total++;
    console.log(this.tail);
  }

  draw(ctx) {
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.headColor;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    for (let i = 0; i < this.tail.length; i++) {
      this.patternUpdate();
      ctx.fillStyle = this.currentColor;
      ctx.fillRect(this.tail[i].x, this.tail[i].y, this.width, this.height);
      ctx.strokeRect(this.tail[i].x, this.tail[i].y, this.width, this.height);
    }
  }

  moveRight() {
    this.currentSpeed.x = 1;
    this.currentSpeed.y = 0;
  }
  moveLeft() {
    this.currentSpeed.x = -1;
    this.currentSpeed.y = 0;
  }
  moveUp() {
    this.currentSpeed.y = -1;
    this.currentSpeed.x = 0;
  }
  moveDown() {
    this.currentSpeed.y = 1;
    this.currentSpeed.x = 0;
  }

  update(deltaTime) {
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = {
      x: this.position.x,
      y: this.position.y,
    };

    this.position.x = this.position.x + this.currentSpeed.x * this.scale;
    this.position.y = this.position.y + this.currentSpeed.y * this.scale;

    borderCollision(this, this.game);
    bodyCollision(this, this.game);
  }
}
