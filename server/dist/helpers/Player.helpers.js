import { emitClient } from "alt-server";
export const logToPlayerConsole = (player, log) => {
    emitClient(player, "player:Log", log);
};
