import { Player } from "../../entities/Player";

export const onPlayerConnect = (player: Player) => {
  player.spawn(-476.00439453125, -1039.160400390625, 52.5652099609375);
  player.emit("player:CharSelection");
};
