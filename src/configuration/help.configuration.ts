import yargs from "yargs";
import { CallbackConfigure, IConfigurationBuilder } from "./configuration";

type HelpDisable = {
  enableExplicit: boolean;
};

type HelpOption = {
  name: string; // Nom de la commande (par défaut help)
  description: string;
  alias?: string;
};

export interface IHelpConfiguration {
  options: HelpOption | HelpDisable;
}

function isTypeHelpOption(object: any): object is HelpOption {
  return (
    object &&
    typeof object === "object" &&
    typeof object.name === "string" &&
    typeof object.description === "string"
  );
}

function isTypeHelpDisable(object: any): object is HelpDisable {
  return (
    object &&
    typeof object === "object" &&
    typeof object.enableExplicit === "boolean"
  );
}

export class HelpConfiguration {
  public options: HelpOption | HelpDisable = {
    name: "help",
    description: "Show help",
  };

  private configure: CallbackConfigure = (yargsInstance) => {
    if (isTypeHelpOption(this.options)) {
      const { name, description, alias } = this.options;
      alias
        ? yargsInstance.help(name, description).alias(name, alias)
        : yargsInstance.help(name, description);
    }

    if (isTypeHelpDisable(this.options)) {
      yargsInstance.help(this.options.enableExplicit);
    }
  };

  constructor(configuration: IConfigurationBuilder) {
    configuration.configures.push(this.configure);
  }
}
