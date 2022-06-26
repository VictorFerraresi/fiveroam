export class Command {
  command: string;
  helpText: string;
  callback: Function;
  adminLevel: number;
  greedyArg: boolean;

  constructor(
    command: string,
    helpText: string,
    callback: Function,
    greedyArg = false,
    adminLevel = 0
  ) {
    this.command = command;
    this.helpText = helpText;
    this.callback = callback;
    this.greedyArg = greedyArg;
    this.adminLevel = adminLevel;
  }
}
