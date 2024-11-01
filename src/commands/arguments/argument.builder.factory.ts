import { ArgumentBuilder } from "./argument.builder";
import { IArgumentMetadata } from "./argument.service.decorator";
import { ArgumentServiceBuilder } from "./argument.service.builder";
import { ArgumentMetadataService } from "./argument.metadata.service";
import { Arguments } from "./arguments";

export class ArgumentBuilderFactory {
  public static createArgumentBuilder(
    metadataArguments: IArgumentMetadata[]
  ): ArgumentBuilder {
    const argumentBuilder = new ArgumentBuilder();

    for (const metadataArgument of metadataArguments) {
      if (metadataArgument instanceof ArgumentMetadataService) {
        argumentBuilder.add(new ArgumentServiceBuilder(metadataArgument));
      }
    }

    return argumentBuilder;
  }
}
