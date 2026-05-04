import { playerController } from '../player/index.js';
import { worldController } from '../world/index.js';
import { enemiesController } from '../enemies/index.js';
import { collisionsChecker } from '../collisions/index.js';
import { scoreController } from '../header/index.js';

const keyboardKeys = {
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
  Space: false,
};

window.addEventListener('keydown', (event) => {
  if (event.code in keyboardKeys) {
    keyboardKeys[event.code] = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code in keyboardKeys) {
    keyboardKeys[event.code] = false;
  }
});

function restartGame() {
  worldController.resetWorld();
  enemiesController.resetEnemies();
  scoreController.resetScore();
  playerController.resetPlayer();
}

let lastTime = 0;
const fps = 60;
const interval = 1000 / fps;
function gameLoop(currentTime) {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= interval) {
    lastTime = currentTime - (deltaTime % interval);

    collisionsChecker.check();
    playerController.checkLoseState();
    playerController.renderPlayer();
    worldController.moveWorld();
    enemiesController.moveEnemies();
    scoreController.scoreCounter();
    scoreController.setMaxScore();
    scoreController.toggleRestartMessage();

    if (keyboardKeys.ArrowRight) {
      playerController.startRunning();
      enemiesController.spawnEnemeis();
    } else if (!keyboardKeys.ArrowRight) {
      playerController.stopRunning();
    }

    if (keyboardKeys.ArrowUp) {
      playerController.jump();
    }

    if (keyboardKeys.ArrowDown) {
      playerController.sitDown();
    } else if (!keyboardKeys.ArrowDown) {
      playerController.standUp();
    }

    if (keyboardKeys.Space) {
      restartGame();
    }
  }

  requestAnimationFrame(gameLoop);
}
gameLoop();
