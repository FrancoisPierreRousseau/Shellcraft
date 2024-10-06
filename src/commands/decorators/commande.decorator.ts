import "reflect-metadata";
import { NewCommand } from "../../type";

export type MetadateCommand = {
  target: NewCommand;
};

export class CommandDecorator {
  public metadata: MetadateCommand;

  constructor(protected readonly target: NewCommand) {
    this.metadata = Reflect.getMetadata("command", target) || {
      target,
    };
  }

  update() {
    Reflect.defineMetadata("command", this.metadata, this.target);
  }
}

export function Command() {
  return (target: NewCommand) => {
    const commandDecorator = new CommandDecorator(target);
    commandDecorator.update();
  };
}
