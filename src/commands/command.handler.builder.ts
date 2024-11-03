import { ICommand } from "./command";
import { Arguments } from "./arguments/arguments";
import { ArgumentBuilder } from "./arguments/argument.builder";
import { ArgumentDecorator } from "./arguments/argument.decorator";
import { ArgumentBuilderDescriptor } from "./arguments/argument.builder.descriptor";
import { Argv } from "yargs";

interface ICommandInfo {}

export class CommandHanderlBuilder implements ICommandInfo {
  private readonly argumentBuilder: ArgumentBuilder;
  private readonly argumentBuilderDescriptor: ArgumentBuilderDescriptor;

  constructor(private readonly command: ICommand) {
    const argumentDecorator = new ArgumentDecorator(command, "run");
    this.argumentBuilder = argumentDecorator.argumentBuilder;
    this.argumentBuilderDescriptor =
      argumentDecorator.argumentDescriptorBuilder;
  }

  buildDescriptor(yargs: Argv<{}>) {
    this.argumentBuilderDescriptor.build(yargs);
  }

  build() {
    return (argv: Arguments) => {
      this.command.run.apply(this.command, this.argumentBuilder.build(argv));
    };
  }
}
