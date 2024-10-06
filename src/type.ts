import { ICommand } from "./commands/command";

export type New<T> = new () => T;
export type NewCommand = New<ICommand>;
