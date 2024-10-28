import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { ArgumentServiceDecorator } from "./arguments/argument.service.decorator";
import { Arguments } from "../arguments";
import { ArgumentServiceBuilder } from "./arguments/argument.service.builder";
import { ICommand } from "./command";

export interface ISingleBuildCommand extends ICommandBuilder {
  mapSubCommand(command: NewCommand): ISingleBuildCommand;
}

export class CommandBuilder
  extends BaseCommandBuilder
  implements ISingleBuildCommand
{
  private readonly subCommands: CommandBuilder[] = [];

  private readonly argumentServiceBuilder: ArgumentServiceBuilder;

  private readonly command: ICommand;

  constructor(private readonly newCommand: NewCommand) {
    super();
    this.command = new newCommand();
    this.argumentServiceBuilder = new ArgumentServiceBuilder(
      new ArgumentServiceDecorator(this.command, "run")
    );
  }

  mapSubCommand(command: NewCommand): ISingleBuildCommand {
    // Créer un CommandHandlerBuilder
    // Créer un ArgumentServiceBuilder
    // Créer un ArgumentsBuilder
    // Créer un handlerBuilder
    const subCommand = new CommandBuilder(command);
    this.subCommands.push(subCommand);
    return subCommand;
  }

  build(yargsInstance: Argv<{}>): void {
    yargsInstance.command({
      command: this.newCommand.name,
      describe: "TEST AVEC PING",
      builder: (yargs) => {
        this.subCommands.forEach((subCommand) => {
          subCommand.build(yargs);
        });
        return yargs.middleware(this.interceptors);
      },
      handler: (argv: Arguments) => {
        this.command.run.apply(
          this.command,
          this.argumentServiceBuilder.build(argv.services!)
        );
      },
    });
  }
}
