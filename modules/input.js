export default class InputHandler {
  constructor(snek, body) {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 37: {
          snek.moveLeft();
          body.moveLeft();
          break;
        }

        case 39: {
          snek.moveRight();
          body.moveRight();
          break;
        }

        case 38: {
          snek.moveUp();
          body.moveUp();
          break;
        }

        case 40: {
          snek.moveDown();
          body.moveDown();
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
