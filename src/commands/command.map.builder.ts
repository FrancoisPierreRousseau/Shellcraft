import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { IGroupedCommandBuilder } from "./grouped.command.builder";

export type CallbackCommandMapBuilder = (
  commandMapBuilde: ICommandMapBuilder
) => ICommandMapBuilder;

export interface ICommandMapBuilder {
  map(command: NewCommand): ICommandBuilder;
  mapGrouped(): IGroupedCommandBuilder;
  commandBuilders: BaseCommandBuilder[];
}
