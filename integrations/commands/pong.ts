import { Service } from "../../src/commands/arguments/argument.service.decorator";
import { ICommand } from "../../src/commands/command";
import { TestService } from "../services/test.service";

// Peut on avoir plusieurs CLI(s) et les fusionner dans un cli principale ?
// Le premier disposera du systéme d'authentification (par exemple auth0)
// lors de la fusion on conservera uniquement on ajoutera les interceptors app en supprime les interceptor
// systéme

// Pour un systéme d'import, il est important de pouvoir selectionner les tables / vues
// auquels on souhaite importer des données (Books, Auteurs). L'enssemble de ces tables
// correspond aux tables schéma... Ce schéma serra utile pour valider la cohérence / intégrité des données.
// Cette validations ressortira ce qui ne va pas avec la modéles sources (champs obligatoire menquant, problémé de typage, nomenclature inccorecte....)
// les validations auto généré doivent prendre en considération les contraintes au niveau de la bdd, leur types.
// Il doit être possible d'ajouter des validation au niveau l'application
// Aprés on associe chaque champs du csv avec un des champs de la table schéma. Je pense qu'une grosse partie de ces validations
// peuvent être autogénérer sous forme de code. Les table schéma (modéle d'import) peuvent être stocké dans une bdd sqlite

export class Ping implements ICommand {
  private name: string = "Ping";

  // @Options() config: Config { pathConf } , @Option() user: User { firstName, name } -> class transformer
  // Pour chaque propriété des objet, j'utiliserais des validators que j'utiliserais dans le check.
  // Cela est franchement cool car dans le check la majorité des types sont des strings
  run(@Service(TestService) service: TestService) {
    service.test();
  }
}
