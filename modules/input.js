export default class InputHandler {
  constructor(snek, game) {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 37: {
          snek.moveLeft();
          break;
        }

        case 39: {
          snek.moveRight();
          break;
        }

        case 38: {
          snek.moveUp();
          break;
        }

        case 40: {
          snek.moveDown();
          break;
        }

        case 80: {
          game.togglePause();
          break;
        }
      }
    });
  }
}

//     document.addEventListener('keyup', (event) => {
//       switch (event.keyCode) {
//         case 37: {
//           snek.stop();
//           break;
//         }

//         case 39: {
//           snek.stop();
//           break;
//         }

//         case 38: {
//           snek.stop();
//           break;
//         }

//         case 40: {
//           snek.stop();
//           break;
//         }
//       }
//     });
//   }
// }
