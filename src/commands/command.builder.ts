import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { Arguments } from "./arguments/arguments";
import { CommandHanderlBuilder } from "./command.handler.builder";

export interface ISingleBuildCommand extends ICommandBuilder {
  mapSubCommand(command: NewCommand): ISingleBuildCommand;
}

export class CommandBuilder
  extends BaseCommandBuilder
  implements ISingleBuildCommand
{
  private readonly subCommandBuilders: CommandBuilder[] = [];
  private readonly commandHandlerBuilder: CommandHanderlBuilder;

  constructor(private readonly newCommand: NewCommand) {
    super();

    this.commandHandlerBuilder = new CommandHanderlBuilder(new newCommand());
  }

  mapSubCommand(command: NewCommand): ISingleBuildCommand {
    const commandBuilder = new CommandBuilder(command);
    this.subCommandBuilders.push(commandBuilder);
    return commandBuilder;
  }

  build(yargsInstance: Argv<{}>): void {
    yargsInstance.command({
      command: this.newCommand.name,
      describe: "TEST AVEC PING",
      builder: (yargs) => {
        this.subCommandBuilders.forEach((subCommand) => {
          subCommand.build(yargs);
        });
        return yargs.middleware(this.interceptors);
      },
      handler: this.commandHandlerBuilder.build(),
    });
  }
}
