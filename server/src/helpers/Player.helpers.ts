import { emitClient, Player } from "alt-server";

export const logToPlayerConsole = (player: Player, log: string) => {
  emitClient(player, "player:Log", log);
};
