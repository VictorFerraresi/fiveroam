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
    emit(eventName, ...args) {
        alt.emitClient(this, eventName, ...args);
    }
    logToConsole(log) {
        this.emit("player:Log", log);
    }
    sendChatMessage = (text, color = "white", gradient = false, icon = false, roleplay = false) => {
        this.emit("chat:showMessage", text, color, gradient, icon, roleplay);
    };
    teleport(pos, rot = this.rot) {
        this.pos = pos;
        this.rot = rot;
    }
}
