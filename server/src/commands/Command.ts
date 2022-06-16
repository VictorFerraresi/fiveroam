export class Command {
  command: string;
  helpText: string;
  callback: Function;
  greedyArg: boolean;

  constructor(
    command: string,
    helpText: string,
    callback: Function,
    greedyArg = false
  ) {
    this.command = command;
    this.helpText = helpText;
    this.callback = callback;
    this.greedyArg = greedyArg;
  }
}
