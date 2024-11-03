import { New } from "../../type";
import { ICommand } from "../command";
import { ArgumentBuilder, IArgumentBuilder } from "./argument.builder";
import { ArgumentServiceBuilder } from "./argument.service.builder";
import { ArgumentOptionBuilder } from "./argument.option.builder";
import {
  ArgumentBuilderDescriptor,
  IArgumentBuilderDescriptor,
} from "./argument.builder.descriptor";

export class ArgumentDecorator {
  public readonly argumentBuilder: ArgumentBuilder;
  public readonly argumentDescriptorBuilder: ArgumentBuilderDescriptor;

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

    this.argumentDescriptorBuilder =
      Reflect.getMetadata(
        this.metadataKeyDescriptorBuilder,
        command,
        this.methdodName
      ) ?? new ArgumentBuilderDescriptor();
  }

  addArgumentBuilder(argumentBuilder: IArgumentBuilder) {
    this.argumentBuilder.add(argumentBuilder);
  }

  addArgumentBuilderDescripor(
    argumentDescriptorBuilder: IArgumentBuilderDescriptor
  ) {
    this.argumentDescriptorBuilder.add(argumentDescriptorBuilder);
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
      this.argumentDescriptorBuilder,
      this.command,
      this.methdodName
    );
  }
}

export function Option(newOption: New<{}>) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentDecorator = new ArgumentDecorator(command, methodName);

    argumentDecorator.addArgumentBuilder(
      new ArgumentOptionBuilder(index, newOption)
    );

    argumentDecorator.update();
  };
}

export function Service(identifier: New<{}> | string) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentDecorator = new ArgumentDecorator(command, methodName);

    argumentDecorator.addArgumentBuilder(
      new ArgumentServiceBuilder(index, identifier)
    );

    argumentDecorator.update();
  };
}
