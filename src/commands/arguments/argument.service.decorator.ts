import yargs from "yargs";
import { New } from "../../type";
import { ICommand } from "../command";
import { ArgumentMetadataService } from "./argument.metadata.service";

export type ArgumentValidator = (args: yargs.Argv) => Error | null;

export type ArgumentMetadata = New<{}> | string | number;

export interface IArgumentMetadata {
  data: ArgumentMetadata;
  validators: ArgumentValidator[];
  index: number;
}

export class ArgumentDecorator {
  public readonly argumentMetadatas: IArgumentMetadata[];

  private readonly metadataKey = "argumentMetadatas";

  constructor(
    private readonly command: ICommand,
    public readonly methdodName: "run"
  ) {
    this.argumentMetadatas =
      Reflect.getMetadata(this.metadataKey, command, this.methdodName) ?? [];
  }

  add(argumentMetadata: IArgumentMetadata) {
    this.argumentMetadatas.push(argumentMetadata);
  }

  update() {
    Reflect.defineMetadata(
      this.metadataKey,
      this.argumentMetadatas,
      this.command,
      this.methdodName
    );
  }
}

export function Service(identifier: New<{}> | string) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentServiceDecorator = new ArgumentDecorator(command, methodName);

    argumentServiceDecorator.add(
      new ArgumentMetadataService(identifier, index, [])
    );

    argumentServiceDecorator.update();
  };
}

