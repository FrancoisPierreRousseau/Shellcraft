import { ICommand } from "../../src/commands/command";

export class SubCommand implements ICommand {
  private name: string = "SubCommand";

  run() {
    console.log(this.name);
  }
}
