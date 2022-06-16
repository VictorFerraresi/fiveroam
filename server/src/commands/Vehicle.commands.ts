import * as alt from "alt-server";
import { Player } from "alt-server";
import { sendChatMessage } from "../helpers/Chat.helpers";
import { Command } from "./Command";
import { addCommand } from "./CommandHandler";

// Callbacks
export const vehCommand = (
  player: Player,
  model: string,
  color1: number,
  color2: number
) => {
  const veh = new alt.Vehicle(
    model,
    player.pos.x + 4,
    player.pos.y,
    player.pos.z,
    0,
    0,
    0
  );
  veh.primaryColor = color1;
  veh.secondaryColor = color2;
};

export const plateCommand = (player: Player, plate: string) => {
  if (!player.vehicle || player.vehicle.driver !== player) {
    sendChatMessage(player, "Você não está dirigindo um veículo!", "red");
    return;
  }

  player.vehicle.numberPlateText = plate;
  sendChatMessage(
    player,
    `Você alterou a placa do veículo para '${plate}'.`,
    "green"
  );
};

// Registros
addCommand(new Command("veh", "/veh [modelo] [cor1] [cor2]", vehCommand));
addCommand(new Command("placa", "/placa [texto]", plateCommand, true));
