import * as alt from "alt-server";
export const onPlayerConnect = (player) => {
    player.spawn(0, 0, 72);
    player.model = "a_c_chimp";
    alt.setTimeout(() => {
        alt.emitClient(player, "player:ShowHud", true);
        alt.emitClient(player, "player:Spawn");
        alt.emitClient(player, "player:DoSomething");
    }, 500);
};
