import * as alt from "alt-server";
export const onPlayerConnect = (player) => {
    alt.emitClient(player, "player:ShowHud", true);
};
