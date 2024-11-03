import { IsBoolean, IsString } from "class-validator";
import { OptionDescriptor } from "../../../src/commands/arguments/argument.descriptor.decorator";

export class Options2 {
  @OptionDescriptor({})
  @IsBoolean()
  unBool: boolean;

  @OptionDescriptor({})
  @IsString()
  unString: string;

  constructor(unBool: boolean, unString: string) {
    this.unBool = unBool;
    this.unString = unString;
  }
}
