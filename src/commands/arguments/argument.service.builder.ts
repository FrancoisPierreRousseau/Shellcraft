import { IServiceCollection } from "../../services/service.collection";
import { ArgumentServiceDecorator } from "./argument.service.decorator";

export class ArgumentServiceBuilder {
  constructor(private readonly argument: ArgumentServiceDecorator) {}

  build(services: IServiceCollection) {
    return Object.entries(this.argument.matadata).reduce(
      (argsService, [index, identifier]) => {
        if (!services.isBound(identifier)) {
          throw new Error(
            `Le service ${identifier} n'est pas disponible dans le conteneur de dépendances.`
          );
        }

        argsService[Number(index)] = services.get(identifier);
        return argsService;
      },
      [] as any[]
    );
  }
}
