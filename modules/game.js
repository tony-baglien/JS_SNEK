import Snek from './snek.js';
import Coin from './coin.js';
import InputHandler from './input.js';

const gameState = { start: 0, running: 1, paused: 2, gameOver: 3 };
const startButton = document.getElementById('start-button');
const optionsButton = document.getElementById('option-button');
const startMenu = document.querySelector('.start-menu');
const pauseMenu = document.querySelector('.pause-menu');
let isPaused = false;
const tryAgain = document.querySelector('.game-over');
const tryAgainButton = document.getElementById('game-over-button');
const canvas = document.getElementById('my-canvas');

let currentGamestate = 0;

export default class GAME {
  constructor(gameHeight, gameWidth) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.gameState = currentGamestate;

    this.snek = new Snek(this);
    this.coin = new Coin(this, this.snek);

    new InputHandler(this.snek, this);
  }

  draw(ctx) {
    this.snek.draw(ctx);
    this.coin.draw(ctx);
  }
  update() {
    if (this.gameState === gameState.start) {
      if (!tryAgain.classList.contains('hidden')) {
        tryAgain.classList.add('hidden');
      }
      canvas.classList.add('hidden');
      startButton.addEventListener('click', () => {
        this.gameState = gameState.running;
      });
    }

    if (this.gameState === gameState.running) {
      if (!tryAgain.classList.contains('hidden')) {
        tryAgain.classList.add('hidden');
      }
      if (!pauseMenu.classList.contains('hidden')) {
        pauseMenu.classList.add('hidden');
      }
      isPaused = false;
      canvas.classList.remove('hidden');
      startMenu.classList.add('hidden');
    }

    if (this.gameState === gameState.paused) {
      pauseMenu.classList.remove('hidden');
    }
    if (!isPaused) {
      this.snek.update();
      this.coin.update();
    }
    if (this.gameState === gameState.gameOver) {
      tryAgain.classList.remove('hidden');
      canvas.classList.add('hidden');

      tryAgainButton.addEventListener('click', () => {
        this.gameState = gameState.running;
        this.reset();
      });
    }
  }
  reset() {
    this.snek.reset();
    this.coin.reset();
  }
  togglePause() {
    if (this.gameState == gameState.paused) {
      this.gameState = gameState.running;
      isPaused = false;
    } else {
      this.gameState = gameState.paused;
      isPaused = true;
    }
  }
}
