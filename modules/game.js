import Snek from './snek.js';
import Coin from './coin.js';
import InputHandler from './input.js';
import colorPicker from './colorPicker.js';

const gameState = {
  start: 0,
  running: 1,
  paused: 2,
  gameOver: 3,
  options: 4,
  color: 5,
  sound: 6,
};

const startMenu = document.querySelector('.start-menu');
const startButton = document.getElementById('start-button');

//Option screen
const optionsButton = document.getElementById('option-button');
const optionMenu = document.querySelector('.option-menu');

const colorOptionsButton = document.querySelector('#color-button');
const colorOptions = document.querySelector('.color-options-container');
//Patterns
const patternOne = document.getElementById('pattern-1');
const patternTwo = document.getElementById('pattern-2');
const patternThree = document.getElementById('pattern-3');

const soundOptionsButton = document.querySelector('#sound-button');
//TODO: ADD Sound Menu

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

    this.screenObjects = [
      startMenu,
      optionMenu,
      pauseMenu,
      gameContainer,
      tryAgain,
      colorOptions,
    ];
  }

  removeAnimation() {
    startMenu.style.opacity = 1;
    clipBackgroundOne.classList.remove('from-left-animation');
    clipBackgroundTwo.classList.remove('from-right-animation');
    startButton.classList.remove('button-appear');
    optionsButton.classList.remove('button-appear');
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
        setTimeout(() => (this.gameState = gameState.running), 1000);
      });
      optionsButton.addEventListener('click', () => {
        startMenu.classList.add('hidden');
        optionMenu.classList.remove('hidden');
        this.gameState = gameState.options;
      });
    }
    //Option Screen
    if (this.gameState === gameState.options) {
      this.screenObjects.forEach((screen) => {
        if (screen !== optionMenu) {
          screen.classList.add('hidden');
        } else {
          screen.classList.remove('hidden');
        }
        colorOptionsButton.addEventListener('click', () => {
          this.gameState = gameState.color;
        });
        returnToStartButton.addEventListener('click', () => {
          colorPicker.showPicker.hide();
          this.gameState = gameState.start;
        });
      });
    }
    //Color Picker
    if (this.gameState === gameState.color) {
      this.screenObjects.forEach((screen) => {
        screen !== colorOptions
          ? screen.classList.add('hidden')
          : screen.classList.remove('hidden');
      });
    }
    colorPicker.showPicker.show();
    this.snek.headColor = colorPicker.showPicker.toRGBAString();
    patternOne.addEventListener('click', () => (this.snek.patternSelector = 1));
    patternTwo.addEventListener('click', () => (this.snek.patternSelector = 2));
    patternThree.addEventListener(
      'click',
      () => (this.snek.patternSelector = 3)
    );

    if (this.gameState === gameState.running) {
      this.screenObjects.forEach((screen) => {
        if (screen !== gameContainer) {
          screen.classList.add('hidden');
        } else {
          screen.classList.remove('hidden');
        }
      });
      isPaused = false;
      setTimeout(() => (gameContainer.style.opacity = 1), 500);
    }

    if (this.gameState === gameState.paused) {
      this.screenObjects.forEach((screen) =>
        screen !== pauseMenu
          ? screen.classList.add('hidden')
          : screen.classList.remove('hidden')
      );
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
    this.snek.patternSelector = 0;
    colorPicker.showPicker.fromString('#FFF');
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
  clipBackgroundOne.classList.add('from-left-animation');
  clipBackgroundTwo.classList.add('from-right-animation');
  startButton.classList.add('button-appear');
  optionsButton.classList.add('button-appear');
  startMenu.style.opacity = 0;
}
