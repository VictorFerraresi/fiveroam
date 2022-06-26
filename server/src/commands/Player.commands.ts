import { Player } from "../entities/player.entity";
import { sendChatMessage } from "../services/chat.service";
import { login } from "../services/player.service";
import { Command } from "./command";
import { addCommand, getAllCommands } from "./command-handler";

// Callbacks
export const helpCommand = (player: Player) => {
  let commands = "";

  getAllCommands().forEach((cmd) => {
    commands += `/${cmd.command} `;
  });

  sendChatMessage(player, commands, "grey");
};

export const loginCommand = async (
  player: Player,
  user: string,
  plainPassword: string
) => {
  const res = await login(user, plainPassword);

  if (!res) {
    sendChatMessage(player, "Usuário ou senha incorretos!", "red");
    return;
  }

  player.uid = res.id;
  player.user = res.username;
  player.encryptedPassword = res.password;
  player.admin = res.admin;
  sendChatMessage(player, `Seja bem-vindo de volta, ${player.user}.`);

  if (player.admin > 0) {
    sendChatMessage(
      player,
      `O seu nível administrativo é ${player.admin}.`,
      "green"
    );
  }

  player.spawn(-476.00439453125, -1039.160400390625, 52.5652099609375);
  player.emit("player:CharSelection");
};

export const posCommand = (player: Player) => {
  player.logToConsole(
    `[Position] ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`
  );
};

// Registros
addCommand(new Command("ajuda", "/ajuda", helpCommand));
addCommand(new Command("login", "/login [usuário] [senha]", loginCommand));
addCommand(new Command("pos", "/pos", posCommand));
