import { pubSub } from '../global/pubsub';

// export const handlers1 = {
//   timer: null,
//   scoreValue: 0,
//   scoreCount: false,
//   scoreCounter(score, step) {
//     if (this.scoreCount) {
//       return;
//     }
//     this.scoreCount = true;
//     this.timer = setInterval(() => {
//       this.scoreValue += 1;
//       score.textContent = this.scoreValue;
//     }, step);
//   },

//   stopCount() {
//     clearInterval(this.timer);
//     this.timer = null;
//     this.scoreCount = false;
//   },

//   resetScore(score) {
//     this.scoreValue = 0;
//     this.scoreCount = false;
//     score.textContent = this.scoreValue;
//   },

//   setMaxScore(score, maxScore) {
//     if (Number(score.textContent) > Number(maxScore.textContent)) {
//       maxScore.textContent = score.textContent;
//       localStorage.setItem('maxScore', maxScore.textContent);
//     }
//   },

//   loadMaxScore(maxScore) {
//     if (maxScore.textContent > 0) {
//       // maxScore.textContent = localStorage.getItem('maxScore');
//     }
//   },
// };

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

  scoreValue: 0,
  scoreCount: false,
  timer: null,
  scoreCounter(score, step) {
    if (this.playerIsRunning && !this.scoreCount) {
      this.scoreCount = true;
      this.timer = setTimeout(() => {
        if (this.playerIsRunning) {
          this.scoreValue += 1;
        }
        score.textContent = this.scoreValue;
        this.scoreCount = false;
      }, step);
    }
  },

  resetScore(score) {
    if (this.playerIsDead) {
      clearTimeout(this.timer);
      this.timer = null;
      this.scoreValue = 0;
      score.textContent = this.scoreValue;
    }
  },

  setMaxScore(score, maxScore) {
    if (Number(score.textContent) > Number(maxScore.textContent)) {
      maxScore.textContent = score.textContent;
      localStorage.setItem('maxScore', maxScore.textContent);
    }
  },

  loadMaxScore(maxScore) {
    if (localStorage.getItem('maxScore')) {
      maxScore.textContent = localStorage.getItem('maxScore');
    }
  },

  toggleRestartMessage(message) {
    if (this.playerIsDead) {
      message.classList.add('header__message--is-active');
    } else if (!this.playerIsDead) {
      message.classList.remove('header__message--is-active');
    }
  },
};
