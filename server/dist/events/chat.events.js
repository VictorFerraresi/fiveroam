import { sendChatMessageToAllPlayers } from "../services/chat.service";
import { executeCommand } from "../commands/command-handler";
import * as alt from "alt-server";
export const onChatInput = (player, isCommand, text) => {
    text = text.trim();
    if (isCommand) {
        const parts = text.split(" ");
        if (parts[0].length > 1) {
            const commandName = parts[0].replace("/", "");
            parts.shift();
            executeCommand(player, commandName, parts);
        }
    }
    else {
        sendChatMessageToAllPlayers(`${player.name}: ${text}`);
    }
};
alt.onClient("chat:onInput", onChatInput);
