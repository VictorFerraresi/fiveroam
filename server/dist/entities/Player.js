import * as alt from "alt-server";
export class Player extends alt.Player {
    team;
    money;
    constructor() {
        super();
    }
    emit(eventName, ...args) {
        alt.emitClient(this, eventName, ...args);
    }
    logToConsole(log) {
        this.emit("player:Log", log);
    }
    giveMoney(amount) {
        this.money += amount;
    }
    takeMoney(amount) {
        this.money -= amount;
    }
    teleport(pos, rot = this.rot) {
        this.pos = pos;
        this.rot = rot;
    }
}
