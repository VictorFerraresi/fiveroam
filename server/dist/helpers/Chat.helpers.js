import * as alt from "alt-server";
export const sendChatMessageToAllPlayers = (text, color = "white", gradient = false, icon = false, roleplay = false) => {
    alt.emitAllClients("chat:showMessage", text, color, gradient, icon, roleplay);
};
export const sendChatMessage = (player, text, color = "white", gradient = false, icon = false, roleplay = false) => {
    alt.emitClient(player, "chat:showMessage", text, color, gradient, icon, roleplay);
};
