import yargs from "yargs";
import { IServiceCollection } from "./services/service.collection";

export interface Arguments extends yargs.Arguments {
  services?: IServiceCollection;
}
