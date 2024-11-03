import { IsString } from "class-validator";
import { OptionDescriptor } from "../../../src/commands/arguments/argument.descriptor.decorator";

// Interdire les objets imbriqué pour les structure complexe.
// Autoriser uniquement  le format json pour les objets complexe pour
export class Option1 {
  @IsString()
  @OptionDescriptor({})
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
