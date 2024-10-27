import { injectable } from "inversify";
import { ConfigureServiceCallback } from "../../src/services/service.collection";

@injectable()
export class TestService {
  public test() {
    console.log("je suis un service");
  }
}

export const configureTest: ConfigureServiceCallback = (service) => {
  service.bind(TestService).to(TestService);
};
