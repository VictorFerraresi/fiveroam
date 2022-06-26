import { sendChatMessageToAllPlayers } from "../helpers/chat.helpers";
import { executeCommand } from "../commands/command-handler";
import { Player } from "../entities/player.entity";
import * as alt from "alt-server";

// Callbacks
export const onChatInput = (
  player: Player,
  isCommand: boolean,
  text: string
) => {
  text = text.trim();
  if (isCommand) {
    const parts = text.split(" ");
    if (parts[0].length > 1) {
      const commandName = parts[0].replace("/", "");
      parts.shift();
      executeCommand(player, commandName, parts);
    }
  } else {
    sendChatMessageToAllPlayers(`${player.name}: ${text}`);
  }
};

// Registros
alt.onClient("chat:onInput", onChatInput);
