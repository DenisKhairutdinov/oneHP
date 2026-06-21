import { dom } from './dom.js';
import { handlers } from './handlers.js';
import { enemiesTypes } from './enemies-types.js';

export const enemiesController = {
  playerStates: handlers.getPlayerState(),
  spawnEnemeis() {
    handlers.spawnEnemies(dom.spawner, enemiesTypes);
  },
  moveEnemies() {
    handlers.moveEnemies(dom.spawner, dom.deleter);
  },
  resetEnemies() {
    handlers.resetEnemies(dom.spawner);
  },
};
