import * as alt from "alt-server";
export class Vehicle extends alt.Vehicle {
    team;
    constructor(model, pos, rot) {
        super(model, pos, rot);
    }
    teleport(pos, rot = this.rot) {
        this.pos = pos;
        this.rot = rot;
    }
}
