import * as alt from "alt-server";
import { Vector3 } from "alt-server";
import { saveCharacter, savePlayer } from "../services/player.service";
import { Character } from "./character.entity";

export class Player extends alt.Player {
  uid: number;
  user: string;
  encryptedPassword: string;
  admin: number;
  characters: Character[];
  activeCharacter?: Character;

  constructor() {
    super();
  }

  logToConsole(log: string) {
    this.emit("player:Log", log);
  }

  teleport(pos: Vector3, rot: Vector3 = this.rot) {
    this.pos = pos;
    this.rot = rot;
  }

  save() {
    if (!!this.activeCharacter) {
      saveCharacter(this.activeCharacter);
    }
    savePlayer(this);
  }
}
