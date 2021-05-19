const gameState = { start: 0, running: 1, paused: 2, gameOver: 3 };

const startButton = document.getElementById('start-button');
const optionsButton = document.getElementById('option-button');

const startMenu = document.querySelector('start-menu');
const canvas = document.getElementById('my-canvas');

let currentGamestate = 0;

console.log(currentGamestate);

export function menuTree() {
  startButton.addEventListener('click', () => {
    currentGamestate = gameState.running;
  });

  if (currentGamestate == gameState.start) {
    canvas.classList.add('hidden');
  } else if (currentGamestate == gameState.running) {
    startMenu.classList.add('hidden');
    canvas.classList.remove('hidden');
  }
}
