import { Service } from "../../src/commands/arguments/argument.service.decorator";
import { ICommand } from "../../src/commands/command";
import { TestService } from "../services/test.service";

export class Ping implements ICommand {
  private name: string = "Ping";

  run(@Service(TestService) service: TestService) {
    service.test();
  }
}
