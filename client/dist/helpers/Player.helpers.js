let spawned = false;
export const isPlayerSpawned = () => {
    return spawned;
};
export const setPlayerSpawned = (isSpawned) => {
    spawned = isSpawned;
};
