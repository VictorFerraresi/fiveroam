import { Command } from "./Command";
import { addCommand } from "./CommandHandler";
export const skinCommand = (player, model) => {
    player.model = model;
};
addCommand(new Command("skin", "/skin [modelo]", skinCommand));
