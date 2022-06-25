export const logToPlayerConsole = (player, log) => {
    player.emit("player:Log", log);
};
