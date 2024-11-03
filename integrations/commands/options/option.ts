import { IsString } from "class-validator";
import { OptionDescriptor } from "../../../src/commands/arguments/argument.descriptor.decorator";

// Interdire les objets imbriqué pour les structure complexe.
// Autoriser uniquement les objets complexe pour le format json
export class Option1 {
  @IsString()
  @OptionDescriptor({})
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
