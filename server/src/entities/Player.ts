import * as alt from "alt-server";

export class Player extends alt.Player {
  team: number;

  constructor() {
    super();
  }

  emit(eventName: string, ...args: any) {
    alt.emitClient(this, eventName, args);
  }
}
