import { Argv } from "yargs";
import { IArgumentBuilderDescriptor } from "./argument.builder.descriptor";
import {
  ArgumentDescriptorDecorator,
  ArgumentOptionDescriptor,
} from "./argument.descriptor.decorator";

export class ArgumentOptionDescriptorBuilder
  implements IArgumentBuilderDescriptor
{
  constructor(private readonly newOption: {}) {}

  build(yargs: Argv<{}>): void {
    const descriptors = Object.getOwnPropertyNames(this.newOption).reduce(
      (descriptors, propName) => {
        descriptors.set(
          propName,
          new ArgumentDescriptorDecorator(this.newOption, propName).get()
        );
        return descriptors;
      },
      new Map<string, ArgumentOptionDescriptor>()
    );
    [...descriptors.keys()].forEach((propertyKey) => {
      yargs.option(propertyKey, descriptors.get(propertyKey) ?? {});
    });
  }
}
