import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import "reflect-metadata";
import { NewCommand } from "./type";
import { CommandManager } from "./commands/command.manager";
import {
  Configuration,
  CallbackConfiguration,
  CallbackConfigure,
  IConfigurationBuilder,
} from "./configuration/global.configuration";

interface ICli {
  run(): void;
  register(...commandsClasses: NewCommand[]): void;
  build(): void;
  configure(callback: CallbackConfiguration): ICli;
}

export class CLI implements ICli, IConfigurationBuilder {
  private readonly yargsInstance = yargs(hideBin(process.argv));
  private readonly commandManager: CommandManager | undefined;
  public readonly configures: CallbackConfigure[] = [];

  private constructor() {
    // console.log(Object.keys(this.options?.help ?? {}));
    // console.log(ddd.arguments);
  }

  static Create(): ICli {
    return new CLI();
  }

  configure(callback: CallbackConfiguration): ICli {
    const configuration = new Configuration(this);

    callback(configuration);

    return this;
  }

  register(...commandsClasses: NewCommand[]) {
    const commandManager = new CommandManager(commandsClasses);
  }

  run() {
    for (const configure of this.configures) {
      configure(this.yargsInstance);
    }

    this.yargsInstance.usage("$0 <cmd> [args]").command(
      "hello [name]",
      "welcome ter yargs!",
      (yargs) => {
        yargs.positional("name", {
          type: "string",
          default: "Cambi",
          describe: "the name to say hello to",
        });
      },
      function (argv) {
        console.log("hello", argv.name, "welcome to yargs!");
      }
    );

    this.yargsInstance.parse();
  }

  build(): void {}
}
