import { Vector3 } from "alt-server";
import { Player } from "../entities/player.entity";
import { Command } from "./command";
import { addCommand } from "./command-handler";

// Callbacks
export const skinCommand = (player: Player, model: string) => {
  player.model = model;
};

export const gotoCoordCommand = (
  player: Player,
  x: number,
  y: number,
  z: number
) => {
  player.teleport(new Vector3(x, y, z));
};

export const reviveCommand = (player: Player) => {
  player.spawn(player.pos);
  player.health = 200;
};

export const healthCommand = (player: Player, amount: number) => {
  let realAmount = amount == 0 ? 0 : amount + 100;
  if (realAmount > player.maxHealth) realAmount = player.maxHealth;
  player.health = realAmount;
};

// Registros
addCommand(new Command("skin", "/skin [modelo]", skinCommand, false, 1));
addCommand(
  new Command("ircoord", "/ircoord [x] [y] [z]", gotoCoordCommand, false, 1)
);
addCommand(new Command("reviver", "/reviver", reviveCommand, false, 1));
addCommand(new Command("vida", "/vida [quantidade]", healthCommand, false, 1));
