import * as alt from "alt-server";
import { sendChatMessage } from "../helpers/Chat.helpers";
import { Command } from "./Command";
import { addCommand } from "./CommandHandler";
export const vehCommand = (player, model, color1, color2) => {
    const veh = new alt.Vehicle(model, player.pos.x + 4, player.pos.y, player.pos.z, 0, 0, 0);
    veh.primaryColor = color1;
    veh.secondaryColor = color2;
};
export const plateCommand = (player, plate) => {
    if (!player.vehicle || player.vehicle.driver !== player) {
        sendChatMessage(player, "Você não está dirigindo um veículo!", "red");
        return;
    }
    player.vehicle.numberPlateText = plate;
    sendChatMessage(player, `Você alterou a placa do veículo para '${plate}'.`, "green");
};
addCommand(new Command("veh", "/veh [modelo] [cor1] [cor2]", vehCommand));
addCommand(new Command("placa", "/placa [texto]", plateCommand, true));
