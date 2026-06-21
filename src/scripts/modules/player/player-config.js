const playerSprites = Object.fromEntries(
  Object.entries(
    import.meta.glob('/src/assets/sprites/player/*.svg', {
      eager: true,
      import: 'default',
    }),
  ).map(([path, resolvedPath]) => {
    const name = path.split('/').pop().replace('.svg', '');
    return [name, resolvedPath];
  }),
);

export const playerConfig = {
  defaultSprite: playerSprites.default,
  crouchDefaultSprite: playerSprites.crouchDefault,
  jumpSprite: playerSprites.jump,
  runLeftSprite: playerSprites.runLeft,
  runRightSprite: playerSprites.runRight,
  crouchrunLeftSprite: playerSprites.crouchrunLeft,
  crouchrunRightSprite: playerSprites.crouchrunRight,
  gameoverSprite: playerSprites.gameover,
  speed: 100,
};
