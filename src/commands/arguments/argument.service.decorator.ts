import { ICommand } from "../command";

export class ArgumentServiceDecorator {
  public matadata: any;

  constructor(
    private readonly command: ICommand,
    private readonly methodName: string | symbol
  ) {
    this.matadata = Reflect.getMetadata("services", command, methodName) ?? {};
  }

  add(identifier: any, index: number) {
    this.matadata[index] = { identifier };
  }

  update() {
    Reflect.defineMetadata(
      "services",
      this.matadata,
      this.command,
      this.methodName
    );
  }
}

export function Service(identifier: any) {
  return (command: ICommand, methodName: string | symbol, index: number) => {
    const argumentServiceDecorator = new ArgumentServiceDecorator(
      command,
      methodName
    );
    argumentServiceDecorator.add(identifier, index);

    argumentServiceDecorator.update();
  };
}
