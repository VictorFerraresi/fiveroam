import * as alt from "alt-server";
import { Player } from "../entities/Player";
import { sendChatMessage } from "../helpers/Chat.helpers";
import { Command } from "./Command";
import { addCommand, getAllCommands } from "./CommandHandler";

// Callbacks
export const helpCommand = (player: Player) => {
  let commands = "";

  getAllCommands().forEach((cmd) => {
    commands += `/${cmd.command} `;
  });

  sendChatMessage(player, commands, "grey");
};

export const skinCommand = (player: Player, model: string) => {
  player.model = model;
};

export const gotoCoordCommand = (
  player: Player,
  x: number,
  y: number,
  z: number
) => {
  player.teleport(new alt.Vector3(x, y, z));
};

export const reviveCommand = (player: Player) => {
  player.spawn(player.pos);
  player.health = 200;
};

export const healthCommand = (player: Player, amount: number) => {
  let realAmount = amount == 0 ? 0 : amount + 100;
  player.logToConsole("Real amount is " + realAmount);
  player.logToConsole("Max health is " + player.maxHealth);
  if (realAmount > player.maxHealth) realAmount = player.maxHealth;
  player.health = realAmount;
};

export const posCommand = (player: Player) => {
  player.logToConsole(
    `[Position] ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`
  );
};

// Registros
addCommand(new Command("ajuda", "/ajuda", helpCommand));
addCommand(new Command("skin", "/skin [modelo]", skinCommand));
addCommand(new Command("ircoord", "/ircoord [x] [y] [z]", gotoCoordCommand));
addCommand(new Command("reviver", "/reviver", reviveCommand));
addCommand(new Command("vida", "/vida [quantidade]", healthCommand));
addCommand(new Command("pos", "/pos", posCommand));
