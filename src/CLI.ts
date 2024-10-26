import yargs, { CommandBuilder } from "yargs";
import { hideBin } from "yargs/helpers";
import "reflect-metadata";
import { NewCommand } from "./type";
import { CommandManager } from "./commands/command.manager";
import {
  Configuration,
  CallbackConfiguration,
  CallbackConfigure,
  IConfiguration,
} from "./configuration/configuration";
import { IServiceCollection } from "./services/service.collection";
import { ICommandMapBuilder } from "./commands/command.map.builder";

export interface ICli {
  run(): void;
  configure(callback: CallbackConfiguration): ICli;
  addCommand(): ICli;
}

// Utiliser un command builder
export class CLI implements ICli, IConfiguration, ICommandMapBuilder {
  private readonly yargsInstance = yargs(hideBin(process.argv));
  public readonly configures: CallbackConfigure[] = [];
  public readonly commandBuilders: CommandBuilder[] = [];

  constructor(public readonly services: IServiceCollection) {}

  configure(callback: CallbackConfiguration): ICli {
    const configuration = new Configuration(this);

    callback(configuration);

    return this;
  }

  addCommand() {
    return this;
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

        yargs.option("bool", {
          type: "boolean",
          default: false,
          describe: "une valeur booleann",
        });
      },
      function (argv) {
        console.log("hello", argv.name, "welcome to yargs!");
      }
    );

    this.yargsInstance.parse();
  }
}
