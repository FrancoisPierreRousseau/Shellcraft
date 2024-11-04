import {
  Option,
  Service,
} from "../../src/commands/arguments/argument.decorator";
import { ICommand } from "../../src/commands/command";
import { TestService } from "../services/test.service";
import { Option1 } from "./options/option";
import { Options2 as Option2 } from "./options/option2";

// Peut on avoir plusieurs CLI(s) et les fusionner dans un cli principale ?
// Le premier disposera du systéme d'authentification (par exemple auth0)
// lors de la fusion on conservera uniquement on ajoutera les interceptors app en supprime les interceptor
// systéme

export class Ping implements ICommand {
  run(
    @Service(TestService) service: TestService,
    @Option(Option1) option: Option1,
    @Option(Option2) option2: Option2
  ) {
    service.test();
    console.log(option);
    console.log(option2);
  }
}
