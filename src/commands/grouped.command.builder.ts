import { Argv, CommandModule } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder } from "./base.command.builder";
import { CommandBuilder, ISingleBuildCommand } from "./command.builder";
import { ICommandMapBuilder } from "./command.map.builder";
import { InterceptorHandler } from "./interceptors/interceptor.handler";

export interface IGroupedCommandBuilder {
  withInterceptors(
    ...interceptors: InterceptorHandler[]
  ): IGroupedCommandBuilder;
  map(command: NewCommand): ISingleBuildCommand;
  mapGrouped(): IGroupedCommandBuilder;
}

export class GroupedCommandBuilder
  extends BaseCommandBuilder
  implements IGroupedCommandBuilder, ICommandMapBuilder
{
  public readonly commandBuilders: BaseCommandBuilder[] = [];

  constructor() {
    super();
  }

  mapGrouped(): IGroupedCommandBuilder {
    const groupedCommandBuilder = new GroupedCommandBuilder();
    this.commandBuilders.push(groupedCommandBuilder);
    return groupedCommandBuilder;
  }

  map(command: NewCommand): ISingleBuildCommand {
    const commandBuilder = new CommandBuilder(command);
    this.commandBuilders.push(commandBuilder);
    return commandBuilder;
  }

  build(): CommandModule[] {
    return this.commandBuilders.reduce((commandModule, commandBuilder) => {
      commandBuilder.interceptors.unshift(...this.interceptors);
      commandModule.push(...commandBuilder.build());
      return commandModule;
    }, [] as CommandModule[]);
  }
}
