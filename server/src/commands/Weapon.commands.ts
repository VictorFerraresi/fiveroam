import { Command } from "./Command";
import { addCommand } from "./CommandHandler";
import * as alt from "alt-server";
import { Player } from "../entities/Player";

// Callbacks
export const weaponCommand = (player: Player, model: string, ammo: number) => {
  player.giveWeapon(alt.hash(model), ammo, true);
};

// Registros
addCommand(new Command("arma", "/arma [nome] [munição]", weaponCommand));
