import { dom } from './dom.js';
import { handlers } from './handlers.js';

export const scoreController = {
  playerState: handlers.getPlayerState(),
  maxScore: handlers.loadMaxScore(dom.getMaxScoreValue()),
  setMaxScore() {
    handlers.setMaxScore(dom.getScoreValue(), dom.getMaxScoreValue());
  },
  scoreCounter() {
    handlers.scoreCounter(dom.getScoreValue(), 500);
  },

  resetScore() {
    handlers.resetScore(dom.getScoreValue());
  },

  toggleRestartMessage() {
    handlers.toggleRestartMessage(dom.getMessage());
  },
};
