import { New } from "../../type";
import { ArgumentType, IArgumentBuilder } from "./argument.builder";
import { Arguments } from "./arguments";

export class ArgumentOptionBuilder implements IArgumentBuilder {
  constructor(index: number, newOption: New<{}>) {}

  build(argv: Arguments): ArgumentType[] {
    return [];
  }
}
