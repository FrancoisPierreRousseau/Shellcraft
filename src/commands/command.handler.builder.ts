import { ICommand } from "./command";
import { Arguments } from "./arguments/arguments";
import { ArgumentBuilder } from "./arguments/argument.builder";
import { ArgumentDecorator } from "./arguments/argument.service.decorator";
import { ArgumentBuilderFactory } from "./arguments/argument.builder.factory";

interface ICommandInfo {}

export class CommandHanderlBuilder implements ICommandInfo {
  private readonly argumentBuilder: ArgumentBuilder;

  constructor(private readonly command: ICommand) {
    const argumentDecorator = new ArgumentDecorator(command, "run");
    this.argumentBuilder = ArgumentBuilderFactory.createArgumentBuilder(
      argumentDecorator.argumentMetadatas
    );
  }

  // Passer en parem argv
  // Création d'un objet qui retournera un type CommandContext avec les infos nécéssaire (services, argument)
  // La création doit se passer dés le début. La validation des arguments également doit être dissocié
  build() {
    return (argv: Arguments) => {
      this.command.run.apply(this.command, this.argumentBuilder.build(argv));
    };
  }
}
