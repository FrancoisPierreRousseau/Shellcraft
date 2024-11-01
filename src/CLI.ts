import yargs from "yargs";
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
  private readonly yargsInstance = yargs(hideBin(process.argv));
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
    for (const callbackEndpointBuilder of callbackCommandBuilders) {
      callbackEndpointBuilder(this);
    }
    return this;
  }

  async run() {
    for (const configure of this.configures) {
      configure(this.yargsInstance);
    }

    this.yargsInstance.middleware((argv: Arguments) => {
      argv.services = this.services;
    });

    for (const commandBuilder of this.commandBuilders) {
      commandBuilder.build(this.yargsInstance);
    }

    this.yargsInstance.parseSync();
  }
}
