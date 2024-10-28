import { ICommand } from "../command";

export class ArgumentServiceDecorator {
  public readonly matadata: Record<number, any>;

  constructor(
    private readonly command: ICommand,
    public readonly methdodName: "run"
  ) {
    this.matadata =
      Reflect.getMetadata("services", command, this.methdodName) ?? {};
  }

  add(identifier: any, index: number) {
    this.matadata[index] = identifier;
  }

  update() {
    Reflect.defineMetadata(
      "services",
      this.matadata,
      this.command,
      this.methdodName
    );
  }
}

export function Service(identifier: any) {
  return (command: ICommand, methodName: "run", index: number) => {
    const argumentServiceDecorator = new ArgumentServiceDecorator(
      command,
      methodName
    );
    argumentServiceDecorator.add(identifier, index);

    argumentServiceDecorator.update();
  };
}
