import Snek from './snek.js';
import Coin from './coin.js';
import InputHandler from './input.js';
import colorPicker from './colorPicker.js';

const gameState = { start: 0, running: 1, paused: 2, gameOver: 3, options: 4 };

const startMenu = document.querySelector('.start-menu');
const startButton = document.getElementById('start-button');

const optionsButton = document.getElementById('option-button');
const optionMenu = document.querySelector('.option-menu');
const pauseMenu = document.querySelector('.pause-menu');

const tryAgain = document.querySelector('.game-over');
const tryAgainButton = document.getElementById('game-over-button');

const returnToStartButton = document.querySelector('#return-to-start-button');

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

    this.screenObjects = [startMenu, optionMenu, gameContainer, tryAgain];
  }

  draw(ctx) {
    this.snek.draw(ctx);
    this.coin.draw(ctx);
  }

  update() {
    if (this.gameState === gameState.start) {
      this.screenObjects.forEach((screen) => {
        if (screen !== startMenu) {
          screen.classList.add('hidden');
        } else {
          screen.classList.remove('hidden');
        }
      });
      startButton.addEventListener('click', () => {
        startScreenLeaving();
        setTimeout(() => (this.gameState = gameState.running), 500);
      });
      optionsButton.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        optionMenu.classList.remove('hidden');
        this.gameState = gameState.options;
      });
    }
    if (this.gameState === gameState.options) {
      this.screenObjects.forEach((screen) => {
        if (screen !== optionMenu) {
          screen.classList.add('hidden');
        } else {
          screen.classList.remove('hidden');
        }
        colorPicker.showPicker.show();
        this.snek.headColor = colorPicker.showPicker.toRGBAString();
        returnToStartButton.addEventListener('click', () => {
          colorPicker.showPicker.hide();
          this.gameState = gameState.start;
        });
      });
    }
    if (this.gameState === gameState.running) {
      this.screenObjects.forEach((screen) => {
        if (screen !== gameContainer) {
          screen.classList.add('hidden');
        } else {
          screen.classList.remove('hidden');
        }
      });
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
      this.screenObjects.forEach((screen) => {
        if (screen !== tryAgain) {
          screen.classList.add('hidden');
        } else {
          screen.classList.remove('hidden');
        }
      });

      tryAgainButton.addEventListener('click', () => {
        tryAgain.style.opacity = 0;
        setTimeout(() => {
          tryAgain.style.opacity = 1;
          gameContainer.style.opacity = 0;
          this.reset();
          this.gameState = gameState.running;
        }, 1500);
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

function startScreenLeaving() {
  clipBackgroundOne.style.animation = 'from-left .3s linear forwards';
  clipBackgroundOne.addEventListener('animationend', () => {
    clipBackgroundTwo.style.animation = 'from-right .3s linear forwards';
    clipBackgroundTwo.addEventListener('animationend', () => {
      startButton.style.animation = 'appear .4s ease-in forwards';
      optionsButton.style.animation = 'appear .4s ease-in forwards';
      optionsButton.addEventListener('animationend', () => {
        startMenu.style.opacity = 0;
      });
    });
  });
}
