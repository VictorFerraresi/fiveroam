import * as alt from "alt-server";
import { saveCharacter, savePlayer } from "../services/player.service";
export class Player extends alt.Player {
    uid;
    user;
    encryptedPassword;
    admin;
    characters;
    activeCharacter;
    constructor() {
        super();
    }
    logToConsole(log) {
        this.emit("player:Log", log);
    }
    teleport(pos, rot = this.rot) {
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
