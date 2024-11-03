import {
  Option,
  Service,
} from "../../src/commands/arguments/argument.decorator";
import { ICommand } from "../../src/commands/command";
import { TestService } from "../services/test.service";
import { Option1 } from "./options/option";

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

  // Utilisation d'un OptionBuilder pour générer les bon type
  // qui serra utiliser par ArgumentOptionBuilder qui serra charger de valider et de construire en un ArgumentType

  // @Options() config:Config { pathConf } , @Option() user:User { firstName, name }
  // -> class validator + class transformer
  run(
    @Service(TestService) service: TestService,
    @Option(Option1) option: Option1
  ) {
    service.test();
    console.log(option.name);
  }
}
