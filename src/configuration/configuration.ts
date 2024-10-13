import yargs from "yargs";
import {
  HelpOption,
  HelpConfiguration,
  IHelpConfiguration,
} from "./help.configuration";

export type GlobalOption = {
  scriptName?: string;
};

export interface IConfigurationBuilder {
  configureHelp(option?: HelpOption): IHelpConfiguration;
  options?: GlobalOption;
}

export interface IConfiguration {
  configures: CallbackConfigure[];
}

export type CallbackConfigure = (yargsInstance: yargs.Argv<{}>) => void;

export type CallbackConfiguration = (
  configurionBuilder: IConfigurationBuilder
) => void;

export class Configuration implements IConfigurationBuilder {
  public options?: GlobalOption;

  private configure: CallbackConfigure = (yargsInstance) => {
    if (this.options?.scriptName) {
      yargsInstance.scriptName(this.options.scriptName);
    }
  };

  constructor(private configuration: IConfiguration) {
    configuration.configures.push(this.configure);
  }

  // Si on ne veux pas configurer help, on le fait (pas besoin de fournir des paramétre par défaut car yargs en fournis déja)
  configureHelp(option?: HelpOption): IHelpConfiguration {
    return new HelpConfiguration(this.configuration, option);
  }
}
