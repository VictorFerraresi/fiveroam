import * as alt from "alt-server";
import { sendChatMessage } from "../helpers/chat.helpers";
import { Command } from "./command";
import { addCommand, getAllCommands } from "./command-handler";
export const helpCommand = (player) => {
    let commands = "";
    getAllCommands().forEach((cmd) => {
        commands += `/${cmd.command} `;
    });
    sendChatMessage(player, commands, "grey");
};
export const skinCommand = (player, model) => {
    player.model = model;
};
export const gotoCoordCommand = (player, x, y, z) => {
    player.teleport(new alt.Vector3(x, y, z));
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
export const posCommand = (player) => {
    player.logToConsole(`[Position] ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`);
};
addCommand(new Command("ajuda", "/ajuda", helpCommand));
addCommand(new Command("skin", "/skin [modelo]", skinCommand));
addCommand(new Command("ircoord", "/ircoord [x] [y] [z]", gotoCoordCommand));
addCommand(new Command("reviver", "/reviver", reviveCommand));
addCommand(new Command("vida", "/vida [quantidade]", healthCommand));
addCommand(new Command("pos", "/pos", posCommand));
