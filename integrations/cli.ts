import { CliBuilder } from "../src/CLI.builder";
import { Jaja } from "./commands/jaja";
import { Pong } from "./commands/ping";
import { Ping } from "./commands/pong";
import { SubCommand } from "./commands/subCommand";
import { configureTest, TestService } from "./services/test.service";

// Utilisation du package 'is-promise' dans mon framework

/*
 Dans le cadre d'un IAM réfléchir à un scénario de si je suis sur tel machine 
 alors j'ai accés à x command. Ou si je suis sur tel session de la machine X alors 
 j'ai accés à tel command. 
*/

// Rajouter un systéme de typage plus poussé (décimal, integer....)

// A penser, avoir la possibilité d'utiliser showHelp dans les commandes
// Cela permet de couper l'exécution du programme et forcer l'affichage d'help

// Cli devra également posséde un injecteur de dépendance.Chaque dépendance pourra être via un décorateur
// @Service injecté dans les paramétre de la fonction run()

// Penser à un systéme d'authenfication à l'aide d'auth0 centralisant les droits auquel
// à le droit d'accéder un utilisateur. Cela activera les commandes, arguments... auquel à le
// droit d'utiliser un utilisateur.

// rajouter un .descriptor pour les commandes

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

cli.run();

/*

cli.use(router)


Cela permettrait de centraliser un systéme d'authentification car commandeIinfo permet 
d'exécuterune logique avant toute les commande



Ou je rajouter un addAuthentification fexible comme dans mon framework
Une commande pourrais correspondre à une ressource 
Command infor correspond à yargs.argv...
cli.beforeRunCommand((@CommandInfo() commandInfo, @Service(name) service) => {
    
})
*/
