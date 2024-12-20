import { Constructor } from "../../type";
import { ICommand } from "../command";
import { ArgumentBuilder, IArgumentBuilder } from "./argument.builder";
import { ArgumentServiceBuilder } from "./argument.service.builder";
import { ArgumentOptionBuilder } from "./argument.option.builder";
import { ArgumentOptionDescriptorBuilder } from "./argument.option.descriptor.builder";

// Plus tars, je ne construirais pas au fur et à mesure mais stockerais
// les types pour le utiliser dans commandBuilder pour créer l'objet complet
export class ArgumentDecorator {
  public readonly argumentBuilder: ArgumentBuilder;
  public readonly argumentOptionDescriptorBuilder: ArgumentOptionDescriptorBuilder[];

  private readonly metadataKeyBuilder = "argumentBuilder";
  private readonly metadataKeyDescriptorBuilder =
    "metadataKeyDescriptorBuilder";

  constructor(
    private readonly command: ICommand,
    public readonly methdodName: "run"
  ) {
    this.argumentBuilder =
      Reflect.getMetadata(this.metadataKeyBuilder, command, this.methdodName) ??
      new ArgumentBuilder();

    this.argumentOptionDescriptorBuilder =
      Reflect.getMetadata(
        this.metadataKeyDescriptorBuilder,
        command,
        this.methdodName
      ) ?? [];
  }

  addArgumentBuilder(argumentBuilder: IArgumentBuilder) {
    this.argumentBuilder.add(argumentBuilder);
  }

  addArgumentBuilderDescripor(
    argumentDescriptorBuilder: ArgumentOptionDescriptorBuilder
  ) {
    this.argumentOptionDescriptorBuilder.push(argumentDescriptorBuilder);
  }

  update() {
    Reflect.defineMetadata(
      this.metadataKeyBuilder,
      this.argumentBuilder,
      this.command,
      this.methdodName
    );

    Reflect.defineMetadata(
      this.metadataKeyDescriptorBuilder,
      this.argumentOptionDescriptorBuilder,
      this.command,
      this.methdodName
    );
  }
}

export function Option(newOption: Constructor<{}>) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentDecorator = new ArgumentDecorator(command, methodName);

    argumentDecorator.addArgumentBuilder(
      new ArgumentOptionBuilder(index, newOption)
    );

    argumentDecorator.addArgumentBuilderDescripor(
      new ArgumentOptionDescriptorBuilder(new newOption())
    );

    argumentDecorator.update();
  };
}

export function Service(identifier: Constructor<{}> | string) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentDecorator = new ArgumentDecorator(command, methodName);

    argumentDecorator.addArgumentBuilder(
      new ArgumentServiceBuilder(index, identifier)
    );

    argumentDecorator.update();
  };
}
