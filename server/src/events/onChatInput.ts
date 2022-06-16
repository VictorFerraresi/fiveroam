import { sendChatMessageToAllPlayers } from "../helpers/Chat.helpers";
import { log, Player } from "alt-server";
import { executeCommand } from "../commands/CommandHandler";

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
