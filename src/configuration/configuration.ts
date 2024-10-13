import yargs from "yargs";
import {
  HelpOption,
  HelpConfiguration,
  IHelpConfiguration,
} from "./help.configuration";

export type GlobalOption = {
  scriptName?: string;
};

export interface IConfiguration {
  configureHelp(option?: HelpOption): IHelpConfiguration;
  options?: GlobalOption;
}

export interface IConfigurationBuilder {
  configures: CallbackConfigure[];
}

export type CallbackConfigure = (yargsInstance: yargs.Argv<{}>) => void;

export type CallbackConfiguration = (
  configurionBuilder: IConfiguration
) => void;

// Si on ne veux pas configurer help, on le fait (pas besoin de fournir des paramétre par défaut car yargs en fournis déja)

export class Configuration implements IConfiguration {
  public options?: GlobalOption;

  private configure: CallbackConfigure = (yargsInstance) => {
    if (this.options?.scriptName) {
      yargsInstance.scriptName(this.options.scriptName);
    }
  };

  constructor(private configuration: IConfigurationBuilder) {
    configuration.configures.push(this.configure);
  }
  configureHelp(option?: HelpOption): IHelpConfiguration {
    return new HelpConfiguration(this.configuration, option);
  }
}
