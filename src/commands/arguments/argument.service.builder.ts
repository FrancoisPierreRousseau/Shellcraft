import yargs from "yargs";
import { IServiceCollection } from "../../services/service.collection";
import { ArgumentServiceDecorator } from "./argument.service.decorator";

export class ArgumentServiceBuilder {
  constructor(
    private readonly argument: ArgumentServiceDecorator,
    private readonly services: IServiceCollection
  ) {}

  validate(argv: yargs.Arguments) {
    // if (!this.services.isBound(identifier)) {
    //   throw new Error(
    //     `Le service ${identifier} n'est pas disponible dans le conteneur de dépendances.`
    //   );
    // }
  }

  build() {
    return Object.entries(this.argument.matadata).reduce(
      (argsService, [index, identifier]) => {
        if (!this.services.isBound(identifier)) {
          throw new Error(
            `Le service ${identifier} n'est pas disponible dans le conteneur de dépendances.`
          );
        }

        argsService[Number(index)] = this.services.get(identifier);
        return argsService;
      },
      [] as any[]
    );
  }
}
