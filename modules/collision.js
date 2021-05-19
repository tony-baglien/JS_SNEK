export function ballCollision(snek, ball) {
  if (
    ball.position.x < snek.position.x + snek.width &&
    ball.position.x + ball.radius * 2 > snek.position.x &&
    ball.position.y < snek.position.y + snek.height &&
    ball.position.y + ball.radius * 2 > snek.position.y
  ) {
    ball.position.x = ball.randomPosition10();
    ball.position.y = ball.randomPosition10();
    snek.eat();
  }
}

export function borderCollision(snek, game) {
  if (snek.position.y + snek.height < 0) {
    game.gameState = 3;
  }

  if (snek.position.y > game.gameHeight) {
    game.gameState = 3;
  }

  if (snek.position.x + snek.width < 0) {
    game.gameState = 3;
  }

  if (snek.position.x > game.gameWidth) {
    game.gameState = 3;
  }
}

export function bodyCollision(snek, game) {
  for (let i = 0; i < snek.tail.length; i++) {
    if (
      snek.tail[i].x === snek.position.x &&
      snek.tail[i].y === snek.position.y
    ) {
      game.reset();
    }
  }
}
