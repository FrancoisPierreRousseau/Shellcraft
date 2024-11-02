import { ArgumentBuilder, IArgumentBuilder } from "./argument.builder";

export class ArgumentBuilderFactory {
  public static createArgumentBuilder(
    argumentBuilders: IArgumentBuilder[]
  ): ArgumentBuilder {
    const argumentBuilder = new ArgumentBuilder();

    for (const arg of argumentBuilders) {
      argumentBuilder.add(arg);
    }

    return argumentBuilder;
  }
}
