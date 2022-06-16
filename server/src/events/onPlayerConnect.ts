import * as alt from "alt-server";
import { Player } from "alt-server";

export const onPlayerConnect = (player: Player) => {
  alt.log(`==> ${player.name} has connected.`);
  player.model = "mp_m_freemode_01";
  player.spawn(813, -279, 66, 1000);
  alt.emitClient(player, `player:Test`);
};
