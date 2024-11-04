import { plainToInstance } from "class-transformer";
import { Constructor } from "../../type";
import {
  ArgumentType as ArgumentItem,
  ArgumentType,
  IArgumentBuilder,
} from "./argument.builder";
import { Arguments } from "./arguments";
import { validate } from "class-validator";

export class ArgumentOptionBuilder implements IArgumentBuilder {
  constructor(
    private readonly index: number,
    private readonly newOption: Constructor<{}>
  ) {}

  build(argv: Arguments): ArgumentItem[] {
    const array: ArgumentType[] = [];

    const obj = Object.getOwnPropertyNames(new this.newOption()).reduce(
      (obj, propName) => {
        obj = { ...obj, [propName]: argv[propName] };
        return obj;
      },
      {}
    );

    const option = plainToInstance(this.newOption, obj);

    validate(option).then((errors) => {
      if (errors.length > 0) {
        throw new Error(
          JSON.stringify(
            errors.map(({ property, constraints, value }) => ({
              property,
              constraints,
              value,
            }))
          )
        );
      }
    });

    array[this.index] = option;

    return array;
  }
}
