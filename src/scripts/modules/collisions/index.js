import { dom } from './dom.js';
import { handlers } from './handlers.js';
import { handlers as enemyHandlers } from '../enemies/handlers.js';

export const collisionsChecker = {
  check() {
    handlers.checkCollisions(dom.getPlayerHurtbox(), enemyHandlers.activeEnemies);
  },
};
