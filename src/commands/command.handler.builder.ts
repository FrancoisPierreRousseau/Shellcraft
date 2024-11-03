import { ICommand } from "./command";
import { Arguments } from "./arguments/arguments";
import { ArgumentBuilder } from "./arguments/argument.builder";
import { ArgumentDecorator } from "./arguments/argument.decorator";
import { ArgumentOptionDescriptorBuilder } from "./arguments/argument.option.descriptor.builder";
import { ArgumentOptionDescriptor } from "./arguments/argument.descriptor.decorator";

interface ICommandInfo {}

export class CommandHanderlBuilder implements ICommandInfo {
  private readonly argumentBuilder: ArgumentBuilder;
  private readonly argumentOptionDescriptorBuilders: ArgumentOptionDescriptorBuilder[];

  constructor(private readonly command: ICommand) {
    const argumentDecorator = new ArgumentDecorator(command, "run");
    this.argumentBuilder = argumentDecorator.argumentBuilder;
    this.argumentOptionDescriptorBuilders =
      argumentDecorator.argumentOptionDescriptorBuilder;
  }

  buildOptionDescriptors() {
    return this.argumentOptionDescriptorBuilders.reduce(
      (argumentOptionDescriptors, argumentOptionDescriptorBuilder) => {
        [...argumentOptionDescriptorBuilder.build().entries()].reduce(
          (argumentOptionDescriptors, [propName, argumentOptionDescriptor]) => {
            argumentOptionDescriptors.set(propName, argumentOptionDescriptor);
            return argumentOptionDescriptors;
          },
          argumentOptionDescriptors
        );
        return argumentOptionDescriptors;
      },
      new Map<string, ArgumentOptionDescriptor>()
    );
  }

  build() {
    return (argv: Arguments) => {
      this.command.run.apply(this.command, this.argumentBuilder.build(argv));
    };
  }
}
