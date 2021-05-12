import GAME from './modules/game.js';


const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const gameHeight = 500;
const gameWidth = 500;

const game = new GAME(gameHeight,gameWidth);

let lastTime = 0;

function gameLoop(timestamp){
    let deltaTime = timestamp - lastTime;

    lastTime = timestamp;

    ctx.clearRect(0,0,gameWidth,gameHeight)
    game.draw(ctx)
    game.update(deltaTime);

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)