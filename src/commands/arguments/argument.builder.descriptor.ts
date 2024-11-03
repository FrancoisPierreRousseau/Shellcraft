import { Argv } from "yargs";

export interface IArgumentBuilderDescriptor {
  build(yargs: Argv<{}>): void;
}

export class ArgumentBuilderDescriptor implements IArgumentBuilderDescriptor {
  private readonly argumentBuilderDescriptors: IArgumentBuilderDescriptor[] =
    [];

  public add(argumentDescriptor: IArgumentBuilderDescriptor) {
    this.argumentBuilderDescriptors.push(argumentDescriptor);
  }

  build(yargs: Argv<{}>): void {
    this.argumentBuilderDescriptors.forEach((argumentDescriptorBuilder) => {
      argumentDescriptorBuilder.build(yargs);
    });
  }
}
