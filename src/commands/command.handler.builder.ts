import { ICommand } from "./command";
import { Arguments } from "./arguments/arguments";
import { ArgumentBuilder } from "./arguments/argument.builder";
import { ArgumentDecorator } from "./arguments/services/argument.service.decorator";
import { ArgumentBuilderFactory } from "./arguments/argument.builder.factory";

interface ICommandInfo {}

// Centralisation de tout les ArgumentBuilder directement dans le décoratorors (patterne composite)
// Cela supprime le factory argument builder
// J'aurais donc un map<New, builder> pour me permettre d'avoir le bon builder sous la main

export class CommandHanderlBuilder implements ICommandInfo {
  private readonly argumentBuilder: ArgumentBuilder;

  constructor(private readonly command: ICommand) {
    const argumentDecorator = new ArgumentDecorator(command, "run");

    this.argumentBuilder = ArgumentBuilderFactory.createArgumentBuilder(
      Array.from(argumentDecorator.argumentBuilders.values())
    );
  }

  build() {
    return (argv: Arguments) => {
      this.command.run.apply(this.command, this.argumentBuilder.build(argv));
    };
  }
}
