import * as native from "natives";
import * as alt from "alt-client";
export const onPlayerTest = () => {
    native.setEntityHasGravity(alt.Player.local.scriptID, false);
};
