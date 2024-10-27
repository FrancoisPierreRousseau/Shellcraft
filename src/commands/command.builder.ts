import { Argv } from "yargs";
import { NewCommand } from "../type";
import { BaseCommandBuilder, ICommandBuilder } from "./base.command.builder";
import { CommandDecorator } from "./decorators/commande.decorator";
import { ISubCommandBuilder } from "./sub.command.builder";

export interface ISingleBuildCommand extends ICommandBuilder {
  mapSubCommand(command: NewCommand): ISubCommandBuilder;
}

export class CommandBuilder
  extends BaseCommandBuilder
  implements ISingleBuildCommand
{
  private readonly commandDecorator: CommandDecorator;

  constructor(private readonly command: NewCommand) {
    super();
    this.commandDecorator = new CommandDecorator(command);
  }
  mapSubCommand(command: NewCommand): ISubCommandBuilder {
    throw new Error("Method not implemented.");
  }

  build(yargsInstance: Argv<{}>): void {
    yargsInstance.command({
      command: this.command.name,
      describe: "TEST AVEC PING",
      handler: () => {
        this.interceptors.forEach((interceptor) => {
          interceptor();
        });
        const command = new this.command();
        command.run();
      },
    });
  }
}
