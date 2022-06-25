import { Player } from "alt-server";

export const logToPlayerConsole = (player: Player, log: string) => {
  player.emit("player:Log", log);
};
