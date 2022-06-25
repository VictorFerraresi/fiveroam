import * as alt from "alt-server";
export class Player extends alt.Player {
    team;
    constructor() {
        super();
    }
    emit(eventName, ...args) {
        alt.emitClient(this, eventName, args);
    }
}
