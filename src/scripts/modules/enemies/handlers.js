import { pubSub } from '../global/pubsub';

export const handlers = {
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

  activeEnemies: [],
  maxEnemies: 3,
  spawnDelay: [1200, 3500],
  isSpawning: false,

  spawnEnemies(spawner, enemiesTypes) {
    class Enemy {
      constructor(type) {
        this.enemy = document.createElement('div');
        this.enemy.className = type.className;
        this.enemy.classList.add('enemy');
        this.speed = type.speed;
        this.enemy.innerHTML = type.html;
        this.x = 0;
        this.hitbox = this.enemy.querySelectorAll('.hitbox');
      }
    }

    if (this.activeEnemies.length < this.maxEnemies && !this.isSpawning) {
      this.isSpawning = true;
      const type = enemiesTypes[Math.floor(Math.random() * enemiesTypes.length)];
      const createdEnemy = new Enemy(type);
      const randomDelay = this.spawnDelay[Math.floor(Math.random() * this.spawnDelay.length)];

      setTimeout(() => {
        this.isSpawning = false;
        if (this.playerIsRunning) {
          spawner.appendChild(createdEnemy.enemy);
          this.activeEnemies.push(createdEnemy);
          createdEnemy.rectRight = createdEnemy.enemy.getBoundingClientRect().right;
        }
      }, randomDelay);
    }
  },

  moveEnemies(spawner, deleter) {
    if (this.playerIsRunning) {
      this.activeEnemies = this.activeEnemies.filter((enemy) => {
        enemy.x -= enemy.speed;
        enemy.rectRight -= enemy.speed;
        enemy.enemy.style.translate = `${enemy.x}px 0 0`;

        if (deleter.getBoundingClientRect().right > enemy.rectRight) {
          enemy.enemy.remove();
          return false;
        }
        return true;
      });
    }
  },

  resetEnemies(spawner) {
    if (this.playerIsDead) {
      this.activeEnemies.length = 0;
      spawner.innerHTML = '';
    }
  },
};
