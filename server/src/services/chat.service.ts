import * as alt from "alt-server";

export const sendChatMessageToAllPlayers = (
  text: string,
  color = "white",
  gradient = false,
  icon: boolean | string = false,
  roleplay = false
) => {
  alt.emitAllClients("chat:showMessage", text, color, gradient, icon, roleplay);
};
