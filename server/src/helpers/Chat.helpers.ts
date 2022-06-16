import * as alt from "alt-server";
import { Player } from "alt-server";

export const sendChatMessageToAllPlayers = (
  text: string,
  color = "white",
  gradient = false,
  icon: boolean | string = false,
  roleplay = false
) => {
  alt.emitAllClients("chat:showMessage", text, color, gradient, icon, roleplay);
};

export const sendChatMessage = (
  player: Player,
  text: string,
  color = "white",
  gradient = false,
  icon: boolean | string = false,
  roleplay = false
) => {
  alt.emitClient(
    player,
    "chat:showMessage",
    text,
    color,
    gradient,
    icon,
    roleplay
  );
};
