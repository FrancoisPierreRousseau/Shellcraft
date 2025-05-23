import { Constructor } from "../../type";
import { Arguments } from "./arguments";

export type ArgumentType = InstanceType<Constructor<{}>>;

export interface IArgumentBuilder {
  build(argv: Arguments): ArgumentType[];
}

export class ArgumentBuilder implements IArgumentBuilder {
  private readonly argumentBuilders: IArgumentBuilder[] = [];

  build(argv: Arguments): ArgumentType[] {
    return this.argumentBuilders.reduce((argumentTypes, argumentBuilder) => {
      argumentBuilder.build(argv).forEach((arg, index) => {
        if (arg) {
          argumentTypes[index] = arg;
        }
      });
      return argumentTypes;
    }, [] as ArgumentType[]);
  }

  add(argumentBuilder: IArgumentBuilder) {
    this.argumentBuilders.push(argumentBuilder);
  }
}
