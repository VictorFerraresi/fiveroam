import * as alt from "alt-server";
export const onPlayerConnect = (player) => {
    player.spawn(-476.00439453125, -1039.160400390625, 52.5652099609375);
    alt.emitClient(player, "player:CharSelection");
};
