import { plainToInstance } from "class-transformer";
import { New } from "../../type";
import {
  ArgumentType as ArgumentItem,
  ArgumentType,
  IArgumentBuilder,
} from "./argument.builder";
import { Arguments } from "./arguments";

export class ArgumentOptionBuilder implements IArgumentBuilder {
  constructor(
    private readonly index: number,
    private readonly newOption: New<{}>
  ) {}

  build(argv: Arguments): ArgumentItem[] {
    const array: ArgumentType[] = [];

    const argument = plainToInstance(this.newOption, {
      excludeExtraneousValues: true,
    });

    array[this.index] = argument;

    return array;
  }
}
