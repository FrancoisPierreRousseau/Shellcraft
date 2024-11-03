export interface IArgumentBuilderDescriptor {
  build(): void;
}

export class ArgumentBuilderDescriptor implements IArgumentBuilderDescriptor {
  private readonly argumentBuilderDescriptors: IArgumentBuilderDescriptor[] =
    [];

  public add(argumentDescriptor: IArgumentBuilderDescriptor) {
    this.argumentBuilderDescriptors.push(argumentDescriptor);
  }

  build(): void {
    throw new Error("Method not implemented.");
  }
}
