import { dom } from './dom.js';
import { handlers } from './handlers.js';

export const scoreController = {
  playerState: handlers.getPlayerState(),
  maxScore: handlers.loadMaxScore(dom.maxScoreValue),
  setMaxScore() {
    handlers.setMaxScore(dom.scoreValue, dom.maxScoreValue);
  },
  scoreCounter() {
    handlers.scoreCounter(dom.scoreValue, 500);
  },

  resetScore() {
    handlers.resetScore(dom.scoreValue);
  },

  toggleRestartMessage() {
    handlers.toggleRestartMessage(dom.message);
  },
};
