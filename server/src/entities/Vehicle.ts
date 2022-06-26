import * as alt from "alt-server";
import { Vector3 } from "alt-server";

export class Vehicle extends alt.Vehicle {
  team: number;

  constructor(model: string | number, pos: Vector3, rot: Vector3) {
    super(model, pos, rot);
  }

  teleport(pos: Vector3, rot: Vector3 = this.rot) {
    this.pos = pos;
    this.rot = rot;
  }
}
