import { New } from "../../type";
import { Arguments } from "./arguments";

export type ArgumentType = InstanceType<New<{}>> | string | number;

export interface IArgumentBuilder {
  build(argv: Arguments): ArgumentType[];
}

export class ArgumentBuilder implements IArgumentBuilder {
  private readonly argumentBuilders: IArgumentBuilder[] = [];

  build(argv: Arguments): ArgumentType[] {
    return this.argumentBuilders.reduce((argumentTypes, argumentBuilder) => {
      argumentTypes.push(...argumentBuilder.build(argv));
      return argumentTypes;
    }, [] as ArgumentType[]);
  }

  add(argumentBuilder: IArgumentBuilder) {
    this.argumentBuilders.push(argumentBuilder);
  }
}
