import { ICommand } from "../../src/commands/command";
import { Command } from "../../src/commands/decorators/commande.decorator";

@Command()
export class Ping implements ICommand {
  private name: string = "Ping";

  run() {
    console.log(this.name);
  }
}
