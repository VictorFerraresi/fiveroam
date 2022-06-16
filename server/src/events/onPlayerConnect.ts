import * as alt from "alt-server";
import { Player } from "alt-server";

export const onPlayerConnect = (player: Player) => {
  alt.emitClient(player, "player:ShowHud", true);
  alt.emitClient(player, "player:Spawn");
};
