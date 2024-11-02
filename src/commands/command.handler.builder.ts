import { ICommand } from "./command";
import { Arguments } from "./arguments/arguments";
import { ArgumentBuilder } from "./arguments/argument.builder";
import { ArgumentDecorator } from "./arguments/services/argument.service.decorator";

interface ICommandInfo {}

export class CommandHanderlBuilder implements ICommandInfo {
  private readonly argumentBuilder: ArgumentBuilder;

  constructor(private readonly command: ICommand) {
    this.argumentBuilder = new ArgumentDecorator(
      command,
      "run"
    ).argumentBuilder;
  }

  build() {
    return (argv: Arguments) => {
      this.command.run.apply(this.command, this.argumentBuilder.build(argv));
    };
  }
}
