import yargs from "yargs";
import { New } from "../../../type";
import { ICommand } from "../../command";
import { IArgumentBuilder } from "../argument.builder";
import { ArgumentServiceBuilder } from "./argument.service.builder";

export type ArgumentValidator = (args: yargs.Argv) => Error | null;

export type ArgumentMetadata = New<{}> | string | number;

export class ArgumentDecorator {
  public readonly argumentBuilders: Map<
    "services" | "options",
    IArgumentBuilder
  >;
  private readonly metadataKey = "argumentBuilders";

  constructor(
    private readonly command: ICommand,
    public readonly methdodName: "run"
  ) {
    this.argumentBuilders =
      Reflect.getMetadata(this.metadataKey, command, this.methdodName) ??
      new Map<"services" | "options", IArgumentBuilder>();
  }

  add(category: "services" | "options", argumentBuilder: IArgumentBuilder) {
    this.argumentBuilders.set(category, argumentBuilder);
  }

  update() {
    Reflect.defineMetadata(
      this.metadataKey,
      this.argumentBuilders,
      this.command,
      this.methdodName
    );
  }
}

export function Service(identifier: New<{}> | string) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentServiceDecorator = new ArgumentDecorator(command, methodName);

    argumentServiceDecorator.add(
      "services",
      new ArgumentServiceBuilder(index, identifier)
    );

    argumentServiceDecorator.update();
  };
}
