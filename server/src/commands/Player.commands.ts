import * as alt from "alt-server";
import { Player } from "alt-server";
import { Command } from "./Command";
import { addCommand } from "./CommandHandler";

// Callbacks
export const skinCommand = (player: Player, model: string) => {
  player.model = model;
};

// Registros
addCommand(new Command("skin", "/skin [modelo]", skinCommand));
