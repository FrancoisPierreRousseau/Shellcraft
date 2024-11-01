import { New } from "../../type";
import {
  ArgumentValidator,
  IArgumentMetadata,
} from "./argument.service.decorator";

export class ArgumentMetadataService implements IArgumentMetadata {
  constructor(
    public readonly data: New<{}> | string,
    public readonly index: number,
    public readonly validators: ArgumentValidator[] = []
  ) {}
}
