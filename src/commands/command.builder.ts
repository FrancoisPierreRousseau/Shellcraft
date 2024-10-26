import { NewCommand } from "../type";
import { CommandDecorator } from "./decorators/commande.decorator";
import { InterceptorHandler } from "./interceptors/interceptor.manager";

export class CommandBuilder {
  private readonly interceptors: InterceptorHandler[] = [];
  private readonly commandDecorator: CommandDecorator;

  constructor(private command: NewCommand) {
    this.commandDecorator = new CommandDecorator(command);
  }
}
