import { Options } from "yargs";

interface ArgumentOptionDescriptor extends Options {}

export class ArgumentDescriptorDecorator {
  private readonly metadataKey: string = "argumentDescriptor";
  private readonly descriptors: Map<{}, ArgumentOptionDescriptor> = new Map();

  constructor(private readonly option: {}, propName: string) {
    this.descriptors = Reflect.getMetadata(this.metadataKey, option, propName);
  }

  get(): ArgumentOptionDescriptor {
    return this.descriptors.get(this.option) ?? {};
  }

  set(argumentOptionDescriptor: ArgumentOptionDescriptor) {
    this.descriptors.set(this.option, argumentOptionDescriptor);
  }

  update() {
    Reflect.defineMetadata(this.metadataKey, this.descriptors, this.option);
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
