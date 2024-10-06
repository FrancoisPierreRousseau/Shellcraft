import yargs from "yargs";

export type HelpOption = {
  name?: string; // Nom de la commande (par défaut help)
  description?: string;
  enableExplicit?: boolean;
};

export interface IHelpConfiguration {}

export class HelpConfiguration {
  constructor(options: HelpOption) {}

  configure(yargsInstance: yargs.Argv<{}>) {}
}
