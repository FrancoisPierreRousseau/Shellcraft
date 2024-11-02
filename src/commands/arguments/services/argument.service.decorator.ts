import yargs from "yargs";
import { New } from "../../../type";
import { ICommand } from "../../command";
import { ArgumentBuilder, IArgumentBuilder } from "../argument.builder";
import { ArgumentServiceBuilder } from "./argument.service.builder";

export type ArgumentValidator = (args: yargs.Argv) => Error | null;

export type ArgumentMetadata = New<{}> | string | number;

export class ArgumentDecorator {
  public readonly argumentBuilder: ArgumentBuilder;
  private readonly metadataKey = "argumentBuilders";

  constructor(
    private readonly command: ICommand,
    public readonly methdodName: "run"
  ) {
    this.argumentBuilder =
      Reflect.getMetadata(this.metadataKey, command, this.methdodName) ??
      new ArgumentBuilder();
  }

  add(argumentBuilder: IArgumentBuilder) {
    this.argumentBuilder.add(argumentBuilder);
  }

  update() {
    Reflect.defineMetadata(
      this.metadataKey,
      this.argumentBuilder,
      this.command,
      this.methdodName
    );
  }
}

export function Service(identifier: New<{}> | string) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentServiceDecorator = new ArgumentDecorator(command, methodName);

    argumentServiceDecorator.add(new ArgumentServiceBuilder(index, identifier));

    argumentServiceDecorator.update();
  };
}
