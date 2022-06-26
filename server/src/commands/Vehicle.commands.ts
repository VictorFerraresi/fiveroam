import { Vector3 } from "alt-server";
import { Player } from "../entities/player.entity";
import { Vehicle } from "../entities/vehicle.entity";
import { sendChatMessage } from "../services/chat.service";
import { Command } from "./command";
import { addCommand } from "./command-handler";

// Callbacks
export const vehCommand = (
  player: Player,
  model: string,
  color1: number,
  color2: number
) => {
  const veh = new Vehicle(
    model,
    new Vector3(player.pos.x + 4, player.pos.y, player.pos.z),
    Vector3.zero
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

export const repairVehicleCommand = (player: Player) => {
  if (!player.vehicle) {
    sendChatMessage(player, "Você não está dentro de um veículo.", "red");
    return;
  }

  player.vehicle.repair();
};

// Registros
addCommand(
  new Command("veh", "/veh [modelo] [cor1] [cor2]", vehCommand, false, 1)
);
addCommand(new Command("placa", "/placa [texto]", plateCommand, true, 1));
addCommand(new Command("reparar", "/reparar", repairVehicleCommand, false, 1));
