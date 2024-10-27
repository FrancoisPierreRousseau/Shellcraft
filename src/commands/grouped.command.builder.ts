import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { CommandBuilder } from "./command.builder";
import { ICommandMapBuilder } from "./command.map.builder";
import { InterceptorHandler } from "./interceptors/interceptor.handler";

export interface IGroupedCommandBuilder extends ICommandBuilder {
  withInterceptor(interceptor: InterceptorHandler): IGroupedCommandBuilder;
  map(command: NewCommand): ICommandBuilder;
}

export class GroupedCommandBuilder
  extends BaseCommandBuilder
  implements IGroupedCommandBuilder, ICommandMapBuilder
{
  public readonly commandBuilders: BaseCommandBuilder[] = [];

  constructor(private readonly commandMapBuilder: ICommandMapBuilder) {
    super();
  }

  withInterceptor(interceptor: InterceptorHandler): IGroupedCommandBuilder {
    return this;
  }

  mapGrouped(): IGroupedCommandBuilder {
    const groupedCommandBuilder = new GroupedCommandBuilder(this);
    this.commandBuilders.push(this);
    return groupedCommandBuilder;
  }
  map(command: NewCommand): ICommandBuilder {
    const commandBuilder = new CommandBuilder(command);
    this.commandBuilders.push(commandBuilder);
    return commandBuilder;
  }
}
