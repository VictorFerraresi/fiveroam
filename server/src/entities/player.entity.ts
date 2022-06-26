import * as alt from "alt-server";
import { Vector3 } from "alt-server";
import { Character } from "./character.entity";

export class Player extends alt.Player {
  uid: number;
  user: string;
  encryptedPassword: string;
  admin: number;
  characters: Character[];
  activeCharacter: Character;

  constructor() {
    super();
  }

  emit(eventName: string, ...args: any[]) {
    alt.emitClient(this, eventName, ...args);
  }

  logToConsole(log: string) {
    this.emit("player:Log", log);
  }

  sendChatMessage = (
    text: string,
    color = "white",
    gradient = false,
    icon: boolean | string = false,
    roleplay = false
  ) => {
    this.emit("chat:showMessage", text, color, gradient, icon, roleplay);
  };

  teleport(pos: Vector3, rot: Vector3 = this.rot) {
    this.pos = pos;
    this.rot = rot;
  }
}
