import { Command } from "./command";
import { addCommand } from "./command-handler";
import * as alt from "alt-server";
import { Player } from "../entities/player.entity";

// Callbacks
export const weaponCommand = (player: Player, model: string, ammo: number) => {
  player.giveWeapon(alt.hash(model), ammo, true);
};

// Registros
addCommand(
  new Command("arma", "/arma [nome] [munição]", weaponCommand, false, 1)
);
