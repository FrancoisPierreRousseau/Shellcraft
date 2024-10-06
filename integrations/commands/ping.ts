import { ICommand } from "../../src/commands/command";

export class Pong implements ICommand {
  run() {
    console.log("pong");
  }
}
