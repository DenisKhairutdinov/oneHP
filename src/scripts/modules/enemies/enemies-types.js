import rat from '/src/assets/sprites/enemies/rat.svg';
import shit from '/src/assets/sprites/enemies/shit.svg';
import fishTop from '/src/assets/sprites/enemies/fishTop.svg';
import fishBottom from '/src/assets/sprites/enemies/fishBottom.svg';
import doggyTrash from '/src/assets/sprites/enemies/doggyTrash.svg';
import trash from '/src/assets/sprites/enemies/trash.svg';
import doggyBone from '/src/assets/sprites/enemies/doggyBone.svg';

export const enemiesTypes = [
  {
    className: 'rat',
    speed: 6,
    html: `<div class="rat__wrapper hitbox"><img src="${rat}" alt="" class="rat__sprite" /></div>`,
  },
  {
    className: 'bird',
    speed: 4,
    html: `<div class="bird__body-sprite"></div><div class="bird__wrapper hitbox"><img src="${shit}" alt="" class="bird__shit" /></div>`,
  },
  {
    className: 'fish',
    speed: 6,
    html: `<div class="fish__wrapper"><img src="${fishTop}" alt="" class="fish__top-sprite hitbox"/><img src="${fishBottom}" alt="" class="fish__bottom-sprite hitbox"/></div>`,
  },
  {
    className: 'trash',
    speed: 6,
    html: `<div class="trash__wrapper hitbox"><img class="trash__sprite" src="${trash}" alt="" /></div>`,
  },
  {
    className: 'doggy',
    speed: 6,
    html: `<div class="doggy__wrapper hitbox"><div class="doggy__body-wrapper"><div class="doggy__body"></div></div><img src="${doggyTrash}" alt="" class="doggy__trash"><div class="doggy__bone-wrapper hitbox"><img src="${doggyBone}" alt="" class="doggy__bone-sprite"></div></div>`,
  },
];
