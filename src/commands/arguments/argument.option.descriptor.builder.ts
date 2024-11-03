import { New } from "../../type";
import { IArgumentBuilderDescriptor } from "./argument.builder.descriptor";

export class ArgumentOptionDescriptorBuilder
  implements IArgumentBuilderDescriptor
{
  constructor(newOption: {}) {}
  build(): void {
    throw new Error("Method not implemented.");
  }
}
