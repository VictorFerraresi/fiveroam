import * as alt from "alt-server";
import { Player } from "../entities/Player";

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
  player.emit("chat:showMessage", text, color, gradient, icon, roleplay);
};
