import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { ArgumentServiceDecorator } from "./arguments/argument.service.decorator";
import { IServiceCollection } from "../services/service.collection";
import { MiddlewareArguments } from "../CLI";

export interface ISingleBuildCommand extends ICommandBuilder {
  mapSubCommand(command: NewCommand): ISingleBuildCommand;
}

export class CommandBuilder
  extends BaseCommandBuilder
  implements ISingleBuildCommand
{
  private readonly subCommands: CommandBuilder[] = [];

  constructor(private readonly command: NewCommand) {
    super();
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
          console.log(subCommand.command.name);
          subCommand.build(yargs);
        });
        return yargs.middleware(this.interceptors);
      },
      handler: (argv: MiddlewareArguments) => {
        const command = new this.command();
        const argumentServiceDecorator = new ArgumentServiceDecorator(
          command,
          "run" // Pas à le mettre ici mais de le decorator et throw si la prop n'est pas présente
        );

        const service = argv.services!.get(
          argumentServiceDecorator.matadata[0].identifier
        );

        command.run.apply(command, [service]);
      },
    });
  }
}
