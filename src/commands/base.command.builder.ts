import { CommandModule, MiddlewareFunction } from "yargs";
import { InterceptorHandler } from "./interceptors/interceptor.handler";

export interface ICommandBuilder {
  withInterceptors(...interceptors: InterceptorHandler[]): ICommandBuilder;
}

export abstract class BaseCommandBuilder implements ICommandBuilder {
  public readonly interceptors: MiddlewareFunction[] = [];

  withInterceptors(...interceptors: InterceptorHandler[]): this {
    this.interceptors.push(...interceptors);
    return this;
  }

  abstract build(): CommandModule[];
}
