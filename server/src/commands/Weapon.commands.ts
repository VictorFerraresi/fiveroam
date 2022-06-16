import { Player } from "alt-server";
import { Command } from "./Command";
import { addCommand } from "./CommandHandler";
import * as alt from "alt-server";

// Callbacks
export const weaponCommand = (player: Player, model: string, ammo: number) => {
  player.giveWeapon(alt.hash(model), ammo, true);
};

// Registros
addCommand(new Command("arma", "/arma [nome] [munição]", weaponCommand));
