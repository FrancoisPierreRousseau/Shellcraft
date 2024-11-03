import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { CommandHanderlBuilder } from "./command.handler.builder";
import { ArgumentBuilder } from "./arguments/argument.builder";

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
    // Commande builder devra se charger de construire l'objet et non de setter directement dans yargs instance
    // Pour la description des commande, j'aurais bien entendu un command descriptor builder
    // Cela se faira par un @Command({ describe, command, alisases, deprecated  ...})
    // Théoriquement il faudrait pas instancier plusieurs fois les options. Je pourrais instancier qu'une fois quand je pourrait build en retournant un objet
    yargsInstance.command({
      command: this.newCommand.name,
      describe: "TEST AVEC PING",
      aliases: ["p"],
      deprecated: false,
      builder: (yargs) => {
        yargs.option("option1", {
          alias: ["o"],
          describe: "Description de l'option 1",
          type: "number",
        });

        //Patterne composite
        // const optionDescriptor = argumentDescriptorBuilder.build(yargs)

        this.subCommandBuilders.forEach((subCommand) => {
          subCommand.build(yargs);
        });
        return yargs.middleware(this.interceptors);
      },
      handler: this.commandHandlerBuilder.build(),
    });
  }
}
