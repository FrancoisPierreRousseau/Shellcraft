import { OptionDescriptor } from "../../../src/commands/arguments/argument.descriptor.decorator";

class Option {
  @OptionDescriptor({})
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const option = new Option("name");

Object.values(option).forEach((value) => {
  console.log(typeof value);
});

export default Option;
