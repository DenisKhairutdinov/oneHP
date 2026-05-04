import { dom } from './dom.js';
import { handlers } from './handlers.js';

export const worldController = {
  sky: handlers.createWorldLayer(dom.getSkySprites(), 2),
  wall: handlers.createWorldLayer(dom.getWallSprites(), 4),
  ground: handlers.createWorldLayer(dom.getGroundSprites(), 6),
  playerState: handlers.getPlayerState(),

  moveWorld() {
    handlers.moveWorld(this.sky, this.wall, this.ground);
  },

  resetWorld() {
    handlers.resetWorld(this.sky, this.wall, this.ground);
  },
};
