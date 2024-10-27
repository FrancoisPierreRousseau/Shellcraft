import { InterceptorHandler } from "./interceptors/interceptor.handler";

export interface ICommandBuilder {
  withInterceptor(interceptor: InterceptorHandler): ICommandBuilder;
}

export class BaseCommandBuilder implements ICommandBuilder {
  withInterceptor(interceptor: InterceptorHandler): ICommandBuilder {
    return this;
  }
}
