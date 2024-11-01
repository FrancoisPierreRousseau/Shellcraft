import { ICommand } from "./commands/command";

export type New<T> = new (...args: any[]) => T;
export type NewCommand = New<ICommand>;
