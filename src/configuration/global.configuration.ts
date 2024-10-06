import yargs from "yargs";
import {
  HelpConfiguration,
  HelpOption,
  IHelpConfiguration,
} from "./help.configuration";

export type GlobalOption = {
  scriptName?: string;
};

export interface IConfiguration {
  help(options: HelpOption): IHelpConfiguration;
  options?: GlobalOption;
}

export interface IConfigurationBuilder {
  configures: CallbackConfigure[];
}

export type CallbackConfigure = (yargsInstance: yargs.Argv<{}>) => void;

export type CallbackConfiguration = (
  configurionBuilder: IConfiguration
) => void;

export class Configuration implements IConfiguration {
  public options?: GlobalOption;
  public helpCongiguration: HelpConfiguration = new HelpConfiguration({});

  private configure: CallbackConfigure = (yargsInstance) => {
    if (this.options?.scriptName) {
      yargsInstance.scriptName(this.options.scriptName);
    }
  };

  constructor(configurationBuilder: IConfigurationBuilder) {
    configurationBuilder.configures.push(this.configure);
  }

  help(options: HelpOption): IHelpConfiguration {
    return new HelpConfiguration(options).configure;
  }
}
