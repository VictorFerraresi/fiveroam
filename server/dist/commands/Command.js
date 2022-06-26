export class Command {
    command;
    helpText;
    callback;
    adminLevel;
    greedyArg;
    constructor(command, helpText, callback, greedyArg = false, adminLevel = 0) {
        this.command = command;
        this.helpText = helpText;
        this.callback = callback;
        this.greedyArg = greedyArg;
        this.adminLevel = adminLevel;
    }
}
