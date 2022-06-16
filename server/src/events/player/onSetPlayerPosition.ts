import { Player, Vector3 } from "alt-server";

export const onSetPlayerPosition = (player: Player, pos: Vector3) => {
  player.pos = pos;
};
