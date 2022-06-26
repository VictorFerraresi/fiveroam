import * as alt from "alt-server";
import { Vector3 } from "alt-server";

export class Player extends alt.Player {
  team: number;
  money: number;

  constructor() {
    super();
  }

  emit(eventName: string, ...args: any[]) {
    alt.emitClient(this, eventName, ...args);
  }

  logToConsole(log: string) {
    this.emit("player:Log", log);
  }

  giveMoney(amount: number) {
    this.money += amount;
  }

  takeMoney(amount: number) {
    this.money -= amount;
  }

  teleport(pos: Vector3, rot: Vector3 = this.rot) {
    this.pos = pos;
    this.rot = rot;
  }
}
