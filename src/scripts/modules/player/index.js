import { playerConfig } from './player-config.js';
import { dom } from './dom.js';
import { handlers } from './handlers.js';

export const playerController = {
  cashedSprites: handlers.cashSprites(playerConfig),
  player: handlers.createPlayer(playerConfig),
  collisionState: handlers.getCollisionState(),

  checkLoseState() {
    handlers.checkLoseState(this.player, dom.getPlayer(), dom.getPlayerSprite());
  },

  renderPlayer() {
    handlers.renderPlayer(this.player, dom.getPlayerSprite(), this.cashedSprites);
  },

  resetPlayer() {
    handlers.resetPlayer(this.player, dom.getPlayer(), dom.getPlayerSprite());
  },

  startRunning() {
    handlers.startRunning(this.player);
  },

  stopRunning() {
    handlers.stopRunning(this.player);
  },

  sitDown() {
    handlers.sitDown(this.player);
  },

  standUp() {
    handlers.standUp(this.player);
  },

  jump() {
    handlers.jump(this.player, dom.getPlayer());
  },
};
