import * as alt from "alt-client";
import * as game from "natives";
import { isPlayerSpawned } from "../helpers/Player.helpers";
import { activateChat, isChatActive } from "./chat";
let cursorStatus = false;
let isHudToggleable = true;
export const showCursor = (show) => {
    if (cursorStatus == show)
        return;
    cursorStatus = show;
    alt.showCursor(show);
};
alt.on("keydown", (key) => {
    if (isPlayerSpawned()) {
        if (key == 112) {
            showCursor(!cursorStatus);
            alt.toggleGameControls(!cursorStatus);
            alt.setCursorPos({ x: 960, y: 540 });
        }
        else if (key == 118) {
            showCompleteHud(!isChatActive());
        }
    }
});
export const showCompleteHud = (toggle) => {
    if (toggle == true && !isHudToggleable)
        return;
    activateChat(toggle);
    game.displayHud(toggle);
    game.displayRadar(toggle);
};
export const lockHudToggleability = (lock) => {
    if (isHudToggleable == !lock)
        return;
    isHudToggleable = !lock;
};
