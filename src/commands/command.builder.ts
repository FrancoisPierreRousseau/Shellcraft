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

  constructor(private readonly newCommand: NewCommand) {
    super();
  }

  mapSubCommand(command: NewCommand): ISingleBuildCommand {
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
        // pour les objets  utiliser class validator pour les validators objet json (Object)
        // Le premier interceptor de chaque commande serra prédent pour valider les argument.
        // Je dissocile la validation de la construction
        // Tout ce code doit se trouver à l'extérieur.
        const command = new this.newCommand();

        const commandHandlerBuilder = new CommandHanderlBuilder(command);

        commandHandlerBuilder.build()(argv);
      },
    });
  }
}
