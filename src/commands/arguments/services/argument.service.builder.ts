import { New } from "../../../type";
import { ArgumentType, IArgumentBuilder } from "../argument.builder";
import { Arguments } from "../arguments";

export class ArgumentServiceBuilder implements IArgumentBuilder {
  constructor(
    private readonly index: number,
    private readonly identifier: New<{}> | string
  ) {}

  build(argv: Arguments): ArgumentType[] {
    if (!argv.services!.isBound(this.identifier)) {
      throw new Error(
        `Le service ${this.identifier} n'est pas disponible dans le conteneur de dépendances.`
      );
    }

    const array: ArgumentType[] = [];

    array[this.index] = argv.services!.get(this.identifier);

    return array;
  }
}
