import { pubSub } from '../global/pubsub.js';

export const handlers = {
  createWorldLayer(domLayer, speed) {
    class WorldLayer {
      constructor(layer, speed) {
        this.domElements = Array.from(layer).map((el) => el);
        this.positions = Array.from(layer).map(() => 0);
        this.speed = speed;
        this.layerAnimationID;
      }
    }
    return new WorldLayer(domLayer, speed);
  },

  playerIsRunning: false,
  playerIsDead: false,
  getPlayerState() {
    pubSub.subscribe('IS_RUNNING', (data) => {
      this.playerIsRunning = data;
    });
    pubSub.subscribe('IS_DEAD', (data) => {
      this.playerIsDead = data;
    });
    return (this.playerIsRunning, this.playerIsDead);
  },

  moveWorld(...createdLayers) {
    if (!this.playerIsRunning) {
      return;
    }
    createdLayers.forEach((layer) => {
      const layerSegmentWidth = layer.domElements[0].offsetWidth;
      layer.positions.forEach((position, index) => {
        layer.positions[index] -= layer.speed;

        if (layer.positions[index] < -layerSegmentWidth * (index + 1)) {
          layer.positions[index] += layerSegmentWidth * layer.positions.length;
        }

        layer.domElements[index].style.translate = `${layer.positions[index]}px 0 0`;
      });
    });
  },

  resetWorld(...createdLayers) {
    if (!this.playerIsDead) {
      return;
    }
    createdLayers.forEach((layer) => {
      layer.positions.forEach((position, index) => {
        layer.positions[index] = 0;
        layer.domElements[index].style.translate = `0 0 0`;
      });
    });
  },
};
