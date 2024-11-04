import { ICommand } from "./commands/command";

export type Constructor<T> = {
  new (...args: any[]): T;
  prototype: T;
};
export type NewCommand = Constructor<ICommand>;

