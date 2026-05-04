import { pubSub } from '../global/pubsub';

export const handlers = {
  checkCollisions(player, enemies) {
    const playerRect = player.getBoundingClientRect();
    let collisionDetected = false;

    if (enemies.length > 0) {
      enemies.forEach((enemy) => {
        enemy.hitbox.forEach((hitbox) => {
          const hitboxRect = hitbox.getBoundingClientRect();

          const collisionX =
            hitboxRect.left < playerRect.right && hitboxRect.right > playerRect.left;
          const collisionY =
            hitboxRect.top < playerRect.bottom && hitboxRect.bottom > playerRect.top;

          if (collisionX && collisionY) {
            collisionDetected = true;
          }

          if (collisionDetected) {
            this.playerIsDead = true;
            pubSub.publish('COLLISION_DETECTED', true);
          }
        });
      });
    }
  },
};
