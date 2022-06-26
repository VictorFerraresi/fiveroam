import * as alt from "alt-server";
import { Player } from "../entities/player.entity";
import { sendChatMessage } from "../services/chat.service";
import { getPlayerByUserAndPassword } from "../services/player.service";
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
  const res = await getPlayerByUserAndPassword(user, plainPassword);

  if (!res) {
    sendChatMessage(player, "Usuário ou senha incorretos!", "red");
    return;
  }

  player.uid = res.id;
  player.user = res.username;
  player.encryptedPassword = res.password;
  player.admin = res.admin;
  sendChatMessage(
    player,
    `Em tese, vc logou e o seu admin level é ${player.admin}`,
    "green"
  );
};

export const skinCommand = (player: Player, model: string) => {
  player.model = model;
};

export const gotoCoordCommand = (
  player: Player,
  x: number,
  y: number,
  z: number
) => {
  player.teleport(new alt.Vector3(x, y, z));
};

export const reviveCommand = (player: Player) => {
  player.spawn(player.pos);
  player.health = 200;
};

export const healthCommand = (player: Player, amount: number) => {
  let realAmount = amount == 0 ? 0 : amount + 100;
  if (realAmount > player.maxHealth) realAmount = player.maxHealth;
  player.health = realAmount;
};

export const posCommand = (player: Player) => {
  player.logToConsole(
    `[Position] ${player.pos.x}, ${player.pos.y}, ${player.pos.z}`
  );
};

// Registros
addCommand(new Command("ajuda", "/ajuda", helpCommand));
addCommand(new Command("login", "/login [usuário] [senha]", loginCommand));
addCommand(new Command("skin", "/skin [modelo]", skinCommand));
addCommand(new Command("ircoord", "/ircoord [x] [y] [z]", gotoCoordCommand));
addCommand(new Command("reviver", "/reviver", reviveCommand));
addCommand(new Command("vida", "/vida [quantidade]", healthCommand));
addCommand(new Command("pos", "/pos", posCommand));
