import { ArgumentType, IArgumentBuilder } from "./argument.builder";
import { ArgumentMetadataService } from "./argument.metadata.service";
import { Arguments } from "./arguments";

export class ArgumentServiceBuilder implements IArgumentBuilder {
  constructor(private readonly argumentMetada: ArgumentMetadataService) {}

  build(argv: Arguments): ArgumentType[] {
    const array: ArgumentType[] = [];

    array[this.argumentMetada.index] = argv.services!.get(
      this.argumentMetada.data
    );

    return array;
  }
}

/* 
validate(): Error[] {
    if (!this.argv.services!.isBound(this.argumentMetada.data)) {
      throw new Error(
        `Le service ${this.argumentMetada.data} n'est pas disponible dans le conteneur de dépendances.`
      );
    }

    return [];
  }
*/
