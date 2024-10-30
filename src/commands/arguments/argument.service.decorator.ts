import yargs from "yargs";
import { New } from "../../type";
import { ICommand } from "../command";
import { IServiceCollection } from "../../services/service.collection";

type ArgumentValidator = (args: yargs.Argv) => boolean;

type ArgumentType = InstanceType<New<any>> | string | number;

interface IArgumentBuilder {
  build(): ArgumentType[];
  validate(): boolean;
}

interface IArgumentMetadata {
  data: ArgumentType;
  validators: ArgumentValidator[];
  index: number;
}

class ArgumentMetadataService implements IArgumentMetadata {
  constructor(
    public readonly data: InstanceType<New<any>> | string,
    public readonly validators: ArgumentValidator[] = [],
    public readonly index: number
  ) {}
}

class ArgumentServiceBuilder implements IArgumentBuilder {
  constructor(
    private readonly argumentMetada: ArgumentMetadataService,
    private readonly services: IServiceCollection
  ) {}

  build(): ArgumentType[] {
    throw new Error("Method not implemented.");
  }
  validate(): boolean {
    return this.services.isBound(this.argumentMetada.data);
  }
}

class ArgumentBuilderFactory {
  private static readonly argumentBuilders: IArgumentBuilder[] = [];

  public static createArgumentBuilder(
    argv: yargs.Arguments,
    services: IServiceCollection,
    cliArguments: IArgumentMetadata[]
  ): any {
    for (const argument of cliArguments) {
      if (argument instanceof ArgumentMetadataService) {
        this.argumentBuilders.push(
          new ArgumentServiceBuilder(argument, services)
        );
      }
    }
  }
}

// IArgumentBuilder { build(argv), validate(  ) }
// ArgumentBuilder
// ArgumentBuilderService { data, index } -> IArgumentBuilder
// ArgumentBuilderOption { data, index } -> IArgumentBuilder

export class ArgumentServiceDecorator {
  public readonly matadata: Record<number, any>;

  constructor(
    private readonly command: ICommand,
    public readonly methdodName: "run"
  ) {
    this.matadata =
      Reflect.getMetadata("services", command, this.methdodName) ?? {};
  }

  add(identifier: any, index: number) {
    this.matadata[index] = identifier;
  }

  update() {
    Reflect.defineMetadata(
      "services",
      this.matadata,
      this.command,
      this.methdodName
    );
  }
}

export function Service(identifier: any) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentServiceDecorator = new ArgumentServiceDecorator(
      command,
      methodName
    );
    argumentServiceDecorator.add(identifier, index);

    argumentServiceDecorator.update();
  };
}
