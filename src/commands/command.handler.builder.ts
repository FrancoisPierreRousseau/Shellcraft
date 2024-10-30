import { ICommand } from "./command";
import { IServiceCollection } from "../services/service.collection";
import { Arguments } from "./arguments/arguments";
import yargs from "yargs";

interface ICommandInfo {}

export class CommandHanderlBuilder implements ICommandInfo {
  constructor(private readonly command: ICommand) {}

  build(services: IServiceCollection, argv: yargs.Arguments) {
    // argumentBuilder.build(argv)
    return (argv: Arguments) => {
      this.command.run();
    };
  }
}
