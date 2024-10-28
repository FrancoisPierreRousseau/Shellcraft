import { Container } from "inversify";
import {
  ConfigureServiceCallback,
  IServiceCollection,
} from "./services/service.collection";
import { CLI, ICli } from "./CLI";

interface ICliBuilder {
  configure(
    ...configureServiceCallbacks: ConfigureServiceCallback[]
  ): ICliBuilder;
  build(): ICli;
}

export class CliBuilder implements ICliBuilder {
  private static readonly services: IServiceCollection = new Container();

  public readonly services: IServiceCollection = CliBuilder.services;

  private constructor() {}

  // Pourrait être asynchrone avec des callback asynchone
  configure(
    ...configureServiceCallbacks: ConfigureServiceCallback[]
  ): ICliBuilder {
    for (const callback of configureServiceCallbacks) {
      callback(this.services);
    }
    return this;
  }

  public static createCliBuilder(): ICliBuilder {
    return new CliBuilder();
  }

  public build(): ICli {
    return new CLI(this.services);
  }
}
