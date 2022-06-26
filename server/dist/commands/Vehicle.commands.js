import { Vector3 } from "alt-server";
import { Vehicle } from "../entities/Vehicle";
import { sendChatMessage } from "../helpers/Chat.helpers";
import { Command } from "./Command";
import { addCommand } from "./CommandHandler";
export const vehCommand = (player, model, color1, color2) => {
    const veh = new Vehicle(model, new Vector3(player.pos.x + 4, player.pos.y, player.pos.z), Vector3.zero);
    veh.primaryColor = color1;
    veh.secondaryColor = color2;
    veh.team = 174;
};
export const plateCommand = (player, plate) => {
    if (!player.vehicle || player.vehicle.driver !== player) {
        sendChatMessage(player, "Você não está dirigindo um veículo!", "red");
        return;
    }
    player.vehicle.numberPlateText = plate;
    sendChatMessage(player, `Você alterou a placa do veículo para '${plate}'.`, "green");
};
export const repairVehicleCommand = (player) => {
    if (!player.vehicle) {
        sendChatMessage(player, "Você não está dentro de um veículo.", "red");
        return;
    }
    player.vehicle.repair();
    player.logToConsole(`Veh team is ${player.vehicle.team}`);
};
addCommand(new Command("veh", "/veh [modelo] [cor1] [cor2]", vehCommand));
addCommand(new Command("placa", "/placa [texto]", plateCommand, true));
addCommand(new Command("reparar", "/reparar", repairVehicleCommand));
