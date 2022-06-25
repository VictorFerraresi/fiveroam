import * as native from "natives";
import * as alt from "alt-client";
import { requestModel } from "../../helpers/Player.helpers";
import { drawText } from "../../helpers/UI.helpers";
let copSelectionCam;
let robberSelectionCam;
let copPed;
let robberPed;
let selectedTeam = 0;
let isSelectingTeam = false;
let hintInterval;
export const onCharSelection = async () => {
    await requestModel(alt.hash("s_m_y_cop_01"), 10000);
    await requestModel(alt.hash("g_m_y_ballasout_01"), 10000);
    copPed = native.createPed(4, alt.hash("s_m_y_cop_01"), -475.21319580078125, -1037.841796875, 52.4652099609375, 140, false, false);
    robberPed = native.createPed(4, alt.hash("g_m_y_ballasout_01"), -473.037353515625, -1039.3450927734375, 52.4652099609375, 130, false, false);
    alt.toggleGameControls(false);
    copSelectionCam = native.createCam("DEFAULT_SCRIPTED_CAMERA", true);
    native.setCamCoord(copSelectionCam, -476.00439453125, -1039.160400390625, 52.3652099609375);
    native.setCamRot(copSelectionCam, 0, 0, -30, 2);
    native.setCamFov(copSelectionCam, 70);
    robberSelectionCam = native.createCam("DEFAULT_SCRIPTED_CAMERA", true);
    native.setCamCoord(robberSelectionCam, -473.828552246, -1040.66369629, 52.3652099609375);
    native.setCamRot(robberSelectionCam, 0, 0, -30, 2);
    native.setCamFov(robberSelectionCam, 70);
    native.setCamActive(copSelectionCam, true);
    native.renderScriptCams(true, false, 0, false, true, 0);
    isSelectingTeam = true;
    hintInterval = alt.everyTick(showHints);
};
export const onFinishCharSelection = () => {
    isSelectingTeam = false;
    alt.clearEveryTick(hintInterval);
    hintInterval = undefined;
    native.renderScriptCams(false, false, 0, false, true, 0);
    native.deletePed(copPed);
    native.deletePed(robberPed);
    copPed = undefined;
    robberPed = undefined;
    alt.toggleGameControls(true);
};
alt.on("keydown", (key) => {
    if (37 == key) {
        if (!isSelectingTeam || selectedTeam == 0)
            return;
        native.playSoundFrontend(1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
        native.setCamActiveWithInterp(copSelectionCam, robberSelectionCam, 300, 1, 1);
        selectedTeam = 0;
    }
    else if (39 == key) {
        if (!isSelectingTeam || selectedTeam == 1)
            return;
        native.playSoundFrontend(1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", true);
        native.setCamActiveWithInterp(robberSelectionCam, copSelectionCam, 300, 1, 1);
        selectedTeam = 1;
    }
    else if (38 == key) {
    }
    else if (40 == key) {
    }
    else if (13 == key) {
        if (!isSelectingTeam)
            return;
        native.playSoundFrontend(1, "FocusIn", "HintCamSounds", true);
        alt.emitServer("player:SelectedCharacter", selectedTeam);
    }
});
const showHints = () => {
    if (0 == selectedTeam) {
        drawText(`Policial`, 0.3, 0.3, 1, 4, 0, 0, 100, 200, false, false, true);
    }
    else if (1 == selectedTeam) {
        drawText(`Bandido`, 0.3, 0.3, 1, 4, 100, 0, 0, 200, false, false, true);
    }
    drawText(`Pressione ~y~ENTER ~w~para selecionar`, 0.5, 0.9, 0.6, 1, 255, 255, 255, 255, true, false, true);
    native.beginTextCommandDisplayHelp("STRING");
    native.addTextComponentSubstringPlayerName(`Use ~INPUT_FRONTEND_LEFT~ ~INPUT_FRONTEND_RIGHT~ ~INPUT_FRONTEND_UP~ ~INPUT_FRONTEND_DOWN~`);
    native.endTextCommandDisplayHelp(0, false, true, -1);
};
