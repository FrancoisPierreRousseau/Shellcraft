import { NewCommand } from "../../type";

export type InterceptorHandler = (...args: any[]) => any;

// Typer le handler (...args: any[]) => any
export class InterceptorManager {
  private readonly interceptors: Map<NewCommand, InterceptorHandler[]> =
    new Map();

  register(command: NewCommand, interceptors: InterceptorHandler[]) {
    this.interceptors.set(command, interceptors);
  }
}
