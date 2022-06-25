import { Vector3 } from "alt-server";
import { Player } from "../../entities/Player";

export const onSetPlayerPosition = (player: Player, pos: Vector3) => {
  player.pos = pos;
};
