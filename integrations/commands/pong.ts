import { Service } from "../../src/commands/arguments/argument.service.decorator";
import { ICommand } from "../../src/commands/command";
import { TestService } from "../services/test.service";

export class Ping implements ICommand {
  private name: string = "Ping";

  // @Option({ min: 1, max: 10 })
  run(@Service(TestService) service: TestService) {
    service.test();
  }
}
