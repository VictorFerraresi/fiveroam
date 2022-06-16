export class Command {
    command;
    helpText;
    callback;
    greedyArg;
    constructor(command, helpText, callback, greedyArg = false) {
        this.command = command;
        this.helpText = helpText;
        this.callback = callback;
        this.greedyArg = greedyArg;
    }
}
