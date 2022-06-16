import { log, Player } from "alt-server";
import { sendChatMessage } from "../helpers/Chat.helpers";
import { Command } from "./Command";

const commands: Command[] = [];

export const addCommand = (command: Command) => {
  if (commands.find((cmd) => cmd.command === command.command)) {
    throw new Error(`Command already registered. (${command.command})`);
  }

  log(`New command added (${command.command})`);

  commands.push(command);
};

export const executeCommand = (
  player: Player,
  command: string,
  args: any[]
) => {
  const foundCommand = commands.find((cmd) => cmd.command === command);

  // Command not found
  if (!foundCommand) {
    sendChatMessage(
      player,
      `O comando que você digitou (${command}) não existe!`,
      "red",
      false,
      "x"
    );

    return;
  }

  const functionArgCount = foundCommand.callback.length - 1;
  const sentArgCount = args.length;

  // Is greedy arg, treat last as a multiple words string
  if (foundCommand.greedyArg) {
    if (sentArgCount > functionArgCount) {
      args[functionArgCount - 1] = args
        .slice(functionArgCount - 1, args.length)
        .join(" ");
      args = args.slice(0, functionArgCount);
    }
  }

  // Args count mismatch
  if (args.length < functionArgCount) {
    sendChatMessage(player, `USO: ${foundCommand.helpText}`, "grey");
    return;
  }

  args = args.map((a) => {
    if (!isNaN(a)) return Number(a);
    return a;
  });

  foundCommand.callback(player, ...args);
};

export const getAllCommands = () => {
  return commands;
};
