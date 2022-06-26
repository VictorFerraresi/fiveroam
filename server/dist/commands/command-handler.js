import { log } from "alt-server";
import { sendChatMessage } from "../services/chat.service";
const commands = [];
export const addCommand = (command) => {
    if (commands.find((cmd) => cmd.command === command.command)) {
        throw new Error(`Command already registered. (${command.command})`);
    }
    log(`New command added (${command.command})`);
    commands.push(command);
};
export const executeCommand = (player, command, args) => {
    const foundCommand = commands.find((cmd) => cmd.command === command);
    if (!foundCommand) {
        sendChatMessage(player, `O comando que você digitou (${command}) não existe!`, "red", false, "x");
        return;
    }
    if (player.admin < foundCommand.adminLevel) {
        sendChatMessage(player, `Você não tem permissão para utilizar este comando!`, "red", false, "x");
        return;
    }
    const functionArgCount = foundCommand.callback.length - 1;
    const sentArgCount = args.length;
    if (foundCommand.greedyArg) {
        if (sentArgCount > functionArgCount) {
            args[functionArgCount - 1] = args
                .slice(functionArgCount - 1, args.length)
                .join(" ");
            args = args.slice(0, functionArgCount);
        }
    }
    if (args.length < functionArgCount) {
        sendChatMessage(player, `USO: ${foundCommand.helpText}`, "grey");
        return;
    }
    args = args.map((a) => {
        if (!isNaN(a))
            return Number(a);
        return a;
    });
    foundCommand.callback(player, ...args);
};
export const getAllCommands = () => {
    return commands;
};
