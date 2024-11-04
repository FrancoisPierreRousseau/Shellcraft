import { Options } from "yargs";

export interface ArgumentOptionDescriptor extends Options {}

export class ArgumentDescriptorDecorator {
  private readonly metadataKey: string = "argumentDescriptor";
  private readonly optionDescriptors: Map<{}, ArgumentOptionDescriptor>;

  constructor(private readonly option: {}, propName: string) {
    this.optionDescriptors =
      Reflect.getMetadata(this.metadataKey, option, propName) ?? new Map();
  }

  get(): ArgumentOptionDescriptor {
    return this.optionDescriptors.get(this.option) ?? {};
  }

  set(argumentOptionDescriptor: ArgumentOptionDescriptor) {
    this.optionDescriptors.set(this.option, argumentOptionDescriptor);
  }

  update() {
    Reflect.defineMetadata(this.metadataKey, this.optionDescriptors, this.option);
  }
}

export function OptionDescriptor(
  argumentOptionDescriptor: ArgumentOptionDescriptor
) {
  return (option: {}, propName: string) => {
    const argumentDescriptorDecorator = new ArgumentDescriptorDecorator(
      option,
      propName
    );
    argumentDescriptorDecorator.set(argumentOptionDescriptor);
  };
}
