import { ICommand } from "../../src/commands/command";

export class Jaja implements ICommand {
  private name: string = "jaja";

  run() {
    console.log(this.name);
  }
}
