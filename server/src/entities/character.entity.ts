import { Player } from "./player.entity";

export class Character {
  uid: number;
  player: Player;
  name: string;
  team: number;
  money: number;

  constructor() {}

  giveMoney(amount: number) {
    this.money += amount;
  }

  takeMoney(amount: number) {
    this.money -= amount;
  }
}
