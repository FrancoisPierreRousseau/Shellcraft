import { ICommand } from "./command";
import { IServiceCollection } from "../services/service.collection";
import { Arguments } from "./arguments/arguments";

interface ICommandInfo {}

export class CommandHanderlBuilder implements ICommandInfo {
  constructor(private readonly command: ICommand) {}

  build(services: IServiceCollection, argv: Arguments) {
    // argumentBuilder.build(argv)
    return (argv: Arguments) => {
      this.command.run();
    };
  }
}
