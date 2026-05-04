import { pubSub } from '../global/pubsub.js';

export const handlers = {
  cashSprites(playerConfig) {
    const cashedSprites = Object.fromEntries(
      Object.entries(playerConfig)
        .filter(([key, value]) => key.includes('Sprite'))
        .map(([key, value]) => {
          const img = new Image();
          img.src = value;
          return [key, img];
        }),
    );

    return cashedSprites;
  },

  createPlayer(playerConfig) {
    class Player {
      constructor(config) {
        this.speed = config.speed;
        this.isCrouching = false;
        this.lastCrouchState = false;
        this.isRunning = false;
        this.isJumping = false;
        this.isDead = false;
        this.animationTimer = null;
      }
    }

    const player = new Player(playerConfig);

    return player;
  },

  renderPlayer(player, playerSprite, cashedSprites) {
    if (!player.isRunning && !player.isJumping && !player.isCrouching && !player.isDead) {
      playerSprite.src = cashedSprites.defaultSprite.src;
    }

    if (player.isJumping && !player.isDead) {
      playerSprite.src = cashedSprites.jumpSprite.src;
    }

    if (!player.isRunning && !player.isJumping && player.isCrouching && !player.isDead) {
      playerSprite.src = cashedSprites.crouchDefaultSprite.src;
    }

    if (player.isRunning && !player.isJumping && !player.isDead) {
      if (player.lastCrouchState !== player.isCrouching) {
        clearInterval(player.animationTimer);
        player.animationTimer = null;
        player.lastCrouchState = player.isCrouching;
      }

      if (player.animationTimer) {
        return;
      }

      const runningSprites = !player.isCrouching
        ? [cashedSprites.runLeftSprite.src, cashedSprites.runRightSprite.src]
        : [cashedSprites.crouchrunLeftSprite.src, cashedSprites.crouchrunRightSprite.src];

      let currentTime = 1;

      currentTime = (currentTime + 1) % runningSprites.length;
      playerSprite.src = runningSprites[currentTime];

      player.animationTimer = setInterval(() => {
        currentTime = (currentTime + 1) % runningSprites.length;
        playerSprite.src = runningSprites[currentTime];
      }, player.speed);
    }

    if (player.isDead) {
      playerSprite.src = cashedSprites.gameoverSprite.src;
    }
  },

  startRunning(player) {
    if (player.isRunning && !player.isDead) {
      return;
    }
    player.isRunning = true;
    pubSub.publish('IS_RUNNING', true);
  },

  stopRunning(player) {
    if (!player.isRunning) {
      return;
    }
    clearInterval(player.animationTimer);
    player.animationTimer = null;
    player.isRunning = false;
    pubSub.publish('IS_RUNNING', false);
  },

  sitDown(player) {
    if (player.isCrouching) {
      return;
    }
    player.isCrouching = true;
  },

  standUp(player) {
    if (!player.isCrouching) {
      return;
    }
    player.isCrouching = false;
  },

  jump(player, domPlayer) {
    if (player.isJumping) {
      return;
    }
    player.isJumping = true;
    domPlayer.classList.add('player--jump');

    domPlayer.addEventListener('animationend', () => {
      domPlayer.classList.remove('player--jump');
      setTimeout(() => {
        player.isJumping = false;
      }, 20);
    });
  },

  collisionDetected: false,
  getCollisionState() {
    pubSub.subscribe('COLLISION_DETECTED', (data) => {
      this.collisionDetected = data;
    });

    return this.collisionDetected;
  },

  checkLoseState(player, domPlayer, domPlayerSprite) {
    if (this.collisionDetected) {
      player.isDead = true;
      domPlayerSprite.classList.add('player__sprite--is-dead');
      document.body.classList.add('game-over');
      pubSub.publish('IS_DEAD', true);
      pubSub.publish('IS_RUNNING', false);
    }
  },

  resetPlayer(player, domPlayer, domPlayerSprite) {
    player.isDead = false;
    player.isJumping = false;
    this.collisionDetected = false;
    domPlayer.classList.remove('player--jump');
    domPlayerSprite.classList.remove('player__sprite--is-dead');
    document.body.classList.remove('game-over');
    pubSub.publish('IS_DEAD', false);
  },
};
