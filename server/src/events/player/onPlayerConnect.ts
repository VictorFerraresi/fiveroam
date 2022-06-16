import * as alt from "alt-server";
import { Player } from "alt-server";

export const onPlayerConnect = (player: Player) => {
  player.spawn(-476.00439453125, -1039.160400390625, 52.5652099609375);
  alt.emitClient(player, "player:CharSelection");
};
