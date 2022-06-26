export class Character {
    uid;
    player;
    name;
    team;
    money;
    constructor() { }
    giveMoney(amount) {
        this.money += amount;
    }
    takeMoney(amount) {
        this.money -= amount;
    }
}
