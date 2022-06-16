let spawned: boolean = false;

export const isPlayerSpawned = () => {
  return spawned;
};

export const setPlayerSpawned = (isSpawned: boolean) => {
  spawned = isSpawned;
};
