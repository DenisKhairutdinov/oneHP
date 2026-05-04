import { dom } from './dom.js';
import { handlers } from './handlers.js';
import { enemiesTypes } from './enemies-types.js';

export const enemiesController = {
  playerStates: handlers.getPlayerState(),
  spawnEnemeis() {
    handlers.spawnEnemies(dom.getSpawner(), enemiesTypes);
  },
  moveEnemies() {
    handlers.moveEnemies(dom.getSpawner(), dom.getDeleter());
  },
  resetEnemies() {
    handlers.resetEnemies(dom.getSpawner());
  },
};
