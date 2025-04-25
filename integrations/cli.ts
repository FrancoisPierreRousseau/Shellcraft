import { CliBuilder } from "../src/CLI.builder";
import { Jaja } from "./commands/jaja";
import { Pong } from "./commands/ping";
import { Ping } from "./commands/pong";
import { SubCommand } from "./commands/subCommand";
import { configureTest } from "./services/test.service";

// Utilisation du package 'is-promise' dans mon framework

/*
 Implémenter les choices 
*/

/*
  Dans le cadre d'une co à une interface, je dois avoir accés à la fois à la machine 
  et au compte
*/

// Rajouter un systéme de typage plus poussé (décimal, integer....)

// A penser, avoir la possibilité d'utiliser showHelp dans les commandes
// Cela permet de couper l'exécution du programme et forcer l'affichage d'help
// Permettre de formater et rendre plus coloré l'affichage

// Au niveeau des middlewares pensaient à prendre en compte "false" ou "true"
// pour couper l'héritage au niveau de l'exécution

/*****************************************************************************************
 *
 * Auth0 Package authentifcation machine
 *
 *************************************************************************************
 */
/*  Penser à un systéme d'authenfication à l'aide d'auth0 centralisant les droits auquel
    à le droit d'accéder un utilisateur. Cela activera les commandes, arguments... auquel à le
    droit d'utiliser un utilisateur. 
    Dans le cadre d'un IAM réfléchir à un scénario de si je suis sur tel machine 
    alors j'ai accés à x command. Ou si je suis sur tel utilisateur  de la machine alors 
    j'ai accés à tel command.
*/

/*****************************************************************************************
 *
 * Package Importation Exportation
 *
 *************************************************************************************
 */
/*
*  Pour un systéme d'import, il est important de pouvoir selectionner les tables / vues
   auquels on souhaite importer des données (Books, Auteurs). L'enssemble de ces tables
   correspond aux tables schéma... Ce schéma serra utile pour valider la cohérence / intégrité des données.
   Cette validations ressortira ce qui ne va pas avec la modéles sources (champs obligatoire menquant, problémé de typage, nomenclature inccorecte....)
   les validations auto généré doivent prendre en considération les contraintes au niveau de la bdd, leur types.
   Il doit être possible d'ajouter des validation au niveau l'application
   Aprés on associe chaque champs du csv avec un des champs de la table schéma. Je pense qu'une grosse partie de ces validations
   peuvent être autogénérer sous forme de code. Les table schéma (modéle d'import) peuvent être stocké dans une bdd sqlite
*/

// Créer un interceptorHandlerBuilder et un commandHandlerBuilder

// rajouter un .descriptor pour les commandes

// Trouver un moyen pour que services des args ne soit pas considéré comme undefined

/*
  Normamlement Ping devrait reprednre les secondGrouped et threesGrouped ? Peutt être que oui, mais si c'est pas le cas
  c'est parceque leur application devrait se faire à la toute fin. La commande est déja build des le map
  donc cela arrête de fonctionner. 
  node .\dist\integrations\cli.js Ping Jaja SubCommand --unBool --unString "Hello" --name ddd
*/

const cliBuilder = CliBuilder.createCliBuilder();

cliBuilder.configure(configureTest);

const cli = cliBuilder.build();

cli.configure((builder) => {
  builder.options = {
    scriptName: "scriptName",
  };

  // Cela serrait mieux si c'est un callback finalement
  // a revoir
  builder.configureHelp({
    description: "une sacré description de la mort qui tue",
    name: "help",
    alias: "h",
  });
});

cli.register((builder) => {
  const firstGrouped = builder.mapGrouped();

  firstGrouped.withInterceptors(
    () => {
      console.log("firstGrouped1");
    },
    () => {
      console.log("firstGrouped2");
    }
  );

  const pingCommand = firstGrouped.map(Ping);

  pingCommand.withInterceptors(() => {
    console.log("pingInt1");
  });

  const subCommandJaja = pingCommand.mapSubCommand(Jaja);

  subCommandJaja.withInterceptors(() => {
    console.log("jajaInt1");
  });

  subCommandJaja.mapSubCommand(Pong);

  subCommandJaja.mapSubCommand(SubCommand);

  const secondGrouped = builder.mapGrouped();

  secondGrouped.withInterceptors(
    () => {
      console.log("secondGrouped1");
    },
    () => {
      console.log("secondGrouped2");
    }
  );

  const threesGrouped = secondGrouped.mapGrouped();

  threesGrouped.withInterceptors(
    () => {
      console.log("threeGrouped1");
    },
    () => {
      console.log("threeGrouped2");
    }
  );

  threesGrouped.map(Pong);

  return builder;
});

(async () => {
  await cli.run();
})();

/*

cli.use(router)


Cela permettrait de centraliser un systéme d'authentification car commandeIinfo permet 
d'exécuterune logique avant toute les commande



Ou je rajouter un addAuthentification fexible comme dans mon framework
Une commande pourrais correspondre à une ressource 
Command infor correspond à yargs.argv...

// CommandInfo {
   name: string
   arguments: { options }
}

cli.beforeRunCommand((@CommandInfo() commandInfo, @Service(name) service) => {
    
})
*/
