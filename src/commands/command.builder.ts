import { CommandModule, CommandBuilder as CommandBuilderYargs } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
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

  build(): CommandModule[] {
    // Pour la description des commande, j'aurais bien entendu un command descriptor builder
    // Cela se faira par un @Command({ describe, command, alisases, deprecated  ...})
    // Théoriquement il faudrait pas instancier plusieurs fois les options. Je pourrais instancier qu'une fois quand je pourrait build en retournant un objet

    const builder: CommandBuilderYargs = (yargs) => {
      const argumentOptionDescriptors =
        this.commandHandlerBuilder.buildOptionDescriptors();

      [...argumentOptionDescriptors.keys()].forEach((propName) => {
        yargs.option(propName, argumentOptionDescriptors.get(propName) ?? {});
      });

      this.interceptors.forEach((middleware) => {
        yargs.middleware(middleware);
      });

      const commandModules = this.subCommandBuilders.reduce(
        (commandModules, commandBuilder) => {
          commandModules.push(...commandBuilder.build());
          return commandModules;
        },
        [] as CommandModule[]
      );

      commandModules.forEach((commandModule) => {
        yargs.command(commandModule);
      });

      return yargs;
    };

    return [
      {
        command: this.newCommand.name,
        describe: "TEST AVEC PING",
        aliases: ["p"],
        deprecated: false,
        builder,
        handler: this.commandHandlerBuilder.build(),
      },
    ];
  }
}
