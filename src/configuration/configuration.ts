import yargs from "yargs";
import { HelpConfiguration, IHelpConfiguration } from "./help.configuration";

export type GlobalOption = {
  scriptName?: string;
};

export interface IConfiguration {
  help: IHelpConfiguration;
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
  public help = new HelpConfiguration(this.configuration);

  private configure: CallbackConfigure = (yargsInstance) => {
    if (this.options?.scriptName) {
      yargsInstance.scriptName(this.options.scriptName);
    }
  };

  constructor(private configuration: IConfigurationBuilder) {
    configuration.configures.push(this.configure);
  }
}
