import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder } from "./base.command.builder";

export interface ISubCommandBuilder {}

export class SubCommandBuilder
  extends BaseCommandBuilder
  implements ISubCommandBuilder
{
  constructor(command: NewCommand) {
    super();
  }

  build(yargsInstance: Argv<{}>): void {
    throw new Error("Method not implemented.");
  }
}
