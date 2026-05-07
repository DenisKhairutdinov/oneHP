# oneHP
**oneHP** is a minimalist runner game where the player has only one hit point and must dodge enemies by jumping or ducking. The project demonstrates clean vanilla JavaScript, DOM‑based rendering, modular architecture, and an event‑driven PubSub system.

**[Play online](https://one-hp.vercel.app/)**<br>
**[Game art (Figma)](https://www.figma.com/design/TolXaz7FUxjJHn4Hp2kbFN/lastHP)**

### Features
- Pure vanilla JavaScript - no Canvas, no frameworks;
- Fully DOM‑driven animations;
- Modular architecture (player, enemies, world, collisions, score);
- PubSub event flow for decoupled logic;
- requestAnimationFrame game loop;
- Collision detection via DOM hitboxes;
- High score saved in localStorage;
- Custom‑made sprites and visuals.

### Controls
- **arrowUp** - jump;
- **arrowDown** - duck;
- **arrowRight** - move forwards;
- **space** - restasrt after death.

### Architecture overview
The game is structured around small, isolated modules, each responsible for a specific part of the logic.
- **Player module** - state, animations, jump/duck logic;
- **Enemies module** - enemy generation, movement, pooling;
- **World module** - world speed, background;
- **Collisions module** - hitbox checks, collision events;
- **Score module** - score tracking, localStorage persistence.

All modules are imported into index.js, which runs the main loop.

### PubSub event flow
The game uses a lightweight publish-subscribe pattern to keep modules decoupled:
1. Collisions detects a hit.
2. Publishes "collision: detected".
3. Player listens → updates state → publishes "player:dead".
4. World, enemies, score listen and stop/update their behavior.
   
This makes the system easy to extend and reason about.

### Graphics
All sprites and visual assets were designed manually in Figma. (**[link](https://www.figma.com/design/TolXaz7FUxjJHn4Hp2kbFN/lastHP)**)

### Tech stack
- JavaScript (ES Modules);
- DOM API;
- CSS animations / transitions;
- requestAnimationFrame;
- localStorage.

### Possible improvements
- Mobile controls & responsive layout;
- Difficulty scaling (world speed increase);
- Sound effects.

### License
**MIT** - free to use and modify.
