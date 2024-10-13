import { CallbackConfigure, IConfigurationBuilder } from "./configuration";

export type HelpOption = {
  name: string;
  description: string;
  alias?: string;
};

export interface IHelpConfiguration {
  enable: boolean;
}

export class HelpConfiguration {
  public enable: boolean = true;

  private configure: CallbackConfigure = (yargsInstance) => {
    if (!this.enable) {
      yargsInstance.help(false);
    }

    if (this.enable && this.options) {
      const { name, description, alias } = this.options;
      alias
        ? yargsInstance.help(name, description).alias(name, alias)
        : yargsInstance.help(name, description);
    }
  };

  constructor(
    configuration: IConfigurationBuilder,
    public options?: HelpOption
  ) {
    configuration.configures.push(this.configure);
  }
}
