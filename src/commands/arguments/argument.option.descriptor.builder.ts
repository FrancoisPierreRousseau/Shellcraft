import { Argv } from "yargs";
import {
  ArgumentDescriptorDecorator,
  ArgumentOptionDescriptor,
} from "./argument.descriptor.decorator";

export class ArgumentOptionDescriptorBuilder {
  constructor(private readonly newOption: {}) {}

  build(): Map<string, ArgumentOptionDescriptor> {
    return Object.getOwnPropertyNames(this.newOption).reduce(
      (descriptors, propName) => {
        descriptors.set(
          propName,
          new ArgumentDescriptorDecorator(this.newOption, propName).get()
        );
        return descriptors;
      },
      new Map<string, ArgumentOptionDescriptor>()
    );
  }
}
