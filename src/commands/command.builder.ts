import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { CommandDecorator } from "./decorators/commande.decorator";
import { InterceptorHandler } from "./interceptors/interceptor.handler";

export class CommandBuilder
  extends BaseCommandBuilder
  implements ICommandBuilder
{
  private readonly commandDecorator: CommandDecorator;

  constructor(private readonly command: NewCommand) {
    super();
    this.commandDecorator = new CommandDecorator(command);
  }
  withInterceptor(interceptor: InterceptorHandler): ICommandBuilder {
    return this;
  }
}
