import { Vector3 } from "alt-server";
import { Command } from "./command";
import { addCommand } from "./command-handler";
export const skinCommand = (player, model) => {
    player.model = model;
};
export const gotoCoordCommand = (player, x, y, z) => {
    player.teleport(new Vector3(x, y, z));
};
export const reviveCommand = (player) => {
    player.spawn(player.pos);
    player.health = 200;
};
export const healthCommand = (player, amount) => {
    let realAmount = amount == 0 ? 0 : amount + 100;
    if (realAmount > player.maxHealth)
        realAmount = player.maxHealth;
    player.health = realAmount;
};
addCommand(new Command("skin", "/skin [modelo]", skinCommand, false, 1));
addCommand(new Command("ircoord", "/ircoord [x] [y] [z]", gotoCoordCommand, false, 1));
addCommand(new Command("reviver", "/reviver", reviveCommand, false, 1));
addCommand(new Command("vida", "/vida [quantidade]", healthCommand, false, 1));
