import { Argv, MiddlewareFunction } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { CommandDecorator } from "./decorators/commande.decorator";

export interface ISingleBuildCommand extends ICommandBuilder {
  mapSubCommand(command: NewCommand): ISingleBuildCommand;
}

export class CommandBuilder
  extends BaseCommandBuilder
  implements ISingleBuildCommand
{
  private readonly commandDecorator: CommandDecorator;

  private readonly subCommands: CommandBuilder[] = [];

  constructor(private readonly command: NewCommand) {
    super();
    this.commandDecorator = new CommandDecorator(command);
  }
  mapSubCommand(command: NewCommand): ISingleBuildCommand {
    const subCommand = new CommandBuilder(command);
    this.subCommands.push(subCommand);
    return subCommand;
  }

  build(yargsInstance: Argv<{}>): void {
    yargsInstance.command({
      command: this.command.name,
      describe: "TEST AVEC PING",
      builder: (yargs) => {
        this.subCommands.forEach((subCommand) => {
          subCommand.build(yargs);
        });
        return yargs.middleware(this.interceptors);
      },
      handler: () => {
        const command = new this.command();
        command.run();
      },
    });
  }
}
