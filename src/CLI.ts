import yargs, {
  CommandModule,
  CommandBuilder as CommandBuilderYargs,
} from "yargs";
import { hideBin } from "yargs/helpers";
import "reflect-metadata";
import {
  Configuration,
  CallbackConfiguration,
  CallbackConfigure,
  IConfiguration,
} from "./configuration/configuration";
import { IServiceCollection } from "./services/service.collection";
import {
  CallbackCommandMapBuilder,
  ICommandMapBuilder,
} from "./commands/command.map.builder";
import { CommandBuilder } from "./commands/command.builder";
import { NewCommand } from "./type";
import {
  GroupedCommandBuilder,
  IGroupedCommandBuilder,
} from "./commands/grouped.command.builder";
import {
  BaseCommandBuilder,
  ICommandBuilder,
} from "./commands/base.command.builder";
import { Arguments } from "./commands/arguments/arguments";

export interface ICli {
  run(): Promise<void>;
  configure(callback: CallbackConfiguration): ICli;
  register(...callbackCommandBuilders: CallbackCommandMapBuilder[]): ICli;
}

export class CLI implements ICli, IConfiguration, ICommandMapBuilder {
  public readonly configures: CallbackConfigure[] = [];
  public readonly commandBuilders: BaseCommandBuilder[] = [];

  constructor(public readonly services: IServiceCollection) {}

  mapGrouped(): IGroupedCommandBuilder {
    const groupedCommandBuilder = new GroupedCommandBuilder();
    this.commandBuilders.push(groupedCommandBuilder);
    return groupedCommandBuilder;
  }

  map(command: NewCommand): ICommandBuilder {
    const commandBuilder = new CommandBuilder(command);
    this.commandBuilders.push(commandBuilder);
    return commandBuilder;
  }

  configure(callback: CallbackConfiguration): ICli {
    const configuration = new Configuration(this);

    callback(configuration);

    return this;
  }

  register(...callbackCommandBuilders: CallbackCommandMapBuilder[]): ICli {
    for (const callbackCommandBuilder of callbackCommandBuilders) {
      callbackCommandBuilder(this);
    }
    return this;
  }

  async run() {
    const yargsInstance = yargs(hideBin(process.argv));

    for (const configure of this.configures) {
      configure(yargsInstance);
    }

    yargsInstance.middleware((argv: Arguments) => {
      argv.services = this.services;
    });

    const commandModules = this.commandBuilders.reduce(
      (commandModules, commandBuilder) => {
        commandModules.push(...commandBuilder.build());
        return commandModules;
      },
      [] as CommandModule[]
    );

    commandModules.forEach((commandModule) => {
      yargsInstance.command(commandModule);
    });

    await yargsInstance.parseAsync();
  }
}
