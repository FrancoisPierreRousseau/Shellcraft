import { IServiceCollection } from "./src/services/service.collection";
import "yargs";

declare module "yargs" {
  interface ArgumentsCamelCase<T> extends yargs.ArgumentsCamelCase<T> {
    services: IServiceCollection;
  }
}
