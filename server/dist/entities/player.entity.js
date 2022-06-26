import * as alt from "alt-server";
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
}
