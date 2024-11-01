import { New } from "../../type";

export type ArgumentType = InstanceType<New<{}>> | string | number;

export interface IArgumentBuilder {
  build(): ArgumentType[];
  validate(): boolean;
}

export class ArgumentBuilder implements IArgumentBuilder {
  private readonly argumentBuilders: IArgumentBuilder[] = [];

  build(): ArgumentType[] {
    return this.argumentBuilders.reduce((argumentTypes, argumentBuilder) => {
      argumentTypes.push(...argumentBuilder.build());
      return argumentTypes;
    }, [] as ArgumentType[]);
  }

  add(argumentBuilder: IArgumentBuilder) {
    this.argumentBuilders.push(argumentBuilder);
  }

  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}
