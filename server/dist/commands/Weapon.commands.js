import { Command } from "./Command";
import { addCommand } from "./CommandHandler";
import * as alt from "alt-server";
export const weaponCommand = (player, model, ammo) => {
    player.giveWeapon(alt.hash(model), ammo, true);
};
addCommand(new Command("arma", "/arma [nome] [munição]", weaponCommand));
