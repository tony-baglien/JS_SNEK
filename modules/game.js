import Snek from './snek.js';
import Coin from './coin.js';
import InputHandler from './input.js';

const gameState = { start: 0, running: 1, paused: 2, gameOver: 3 };

const startMenu = document.querySelector('.start-menu');
const startButton = document.getElementById('start-button');

const optionsButton = document.getElementById('option-button');
const pauseMenu = document.querySelector('.pause-menu');

const tryAgain = document.querySelector('.game-over');
const tryAgainButton = document.getElementById('game-over-button');

const gameContainer = document.querySelector('.game-container');
const points = document.getElementById('number');

let isPaused = false;
let currentGamestate = 0;
let clipBackgroundOne = document.getElementById('clip-background-1');
let clipBackgroundTwo = document.getElementById('clip-background-2');

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
      gameContainer.classList.add('hidden');
      startButton.addEventListener('click', () => {
        clipBackgroundOne.style.animation = 'from-left .3s linear forwards';
        clipBackgroundOne.addEventListener('animationend', () => {
          clipBackgroundTwo.style.animation = 'from-right .3s linear forwards';
          clipBackgroundTwo.addEventListener('animationend', () => {
            startButton.style.animation = 'appear .4s ease-in forwards';
            optionsButton.style.animation = 'appear .4s ease-in forwards';
            optionsButton.addEventListener('animationend', () => {
              startMenu.style.opacity = 0;
              setTimeout(() => (this.gameState = gameState.running), 500);
            });
          });
        });
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
      gameContainer.classList.remove('hidden');
      startMenu.classList.add('hidden');
      setTimeout(() => (gameContainer.style.opacity = 1), 500);
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
      gameContainer.classList.add('hidden');

      tryAgainButton.addEventListener('click', () => {
        this.gameState = gameState.running;
        this.reset();
      });
    }
    points.innerHTML = this.snek.total;
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
