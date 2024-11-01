import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { ArgumentDecorator } from "./arguments/argument.service.decorator";
import { Arguments } from "./arguments/arguments";
import { ArgumentBuilderFactory } from "./arguments/argument.builder.factory";

export interface ISingleBuildCommand extends ICommandBuilder {
  mapSubCommand(command: NewCommand): ISingleBuildCommand;
}

export class CommandBuilder
  extends BaseCommandBuilder
  implements ISingleBuildCommand
{
  private readonly subCommandBuilders: CommandBuilder[] = [];

  constructor(private readonly newCommand: NewCommand) {
    super();
  }

  mapSubCommand(command: NewCommand): ISingleBuildCommand {
    // Créer un ArgumentsBuilder ???
    // Créer un CommandHandlerBuilder
    // Créer un InterceptorHandlerBuilder
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
      handler: (argv: Arguments) => {
        // CommandHandlerBuilder.... qui implementera un ICommandIndo (pour avoir accés dans les middlewares)
        // pour les objets  utiliser class validator ^pour les validators
        const command = new this.newCommand();

        const argumentDecorator = new ArgumentDecorator(command, "run");
        const argumentBuilder = ArgumentBuilderFactory.createArgumentBuilder(
          argv,
          argumentDecorator.argumentMetadatas
        );

        command.run.apply(command, argumentBuilder.build());
      },
    });
  }
}
