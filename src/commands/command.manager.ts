import { NewCommand } from "../type";

export class CommandManager {
  private commands: Map<string, NewCommand> = new Map<string, NewCommand>();

  constructor(commandsClasses: NewCommand[]) {
    commandsClasses.forEach((commandClass) => {
      this.commands.set(commandClass.name, commandClass);
    });
  }
}
