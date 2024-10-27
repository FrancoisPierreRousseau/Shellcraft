import { CLI } from "../src/CLI";
import { CliBuilder } from "../src/CLI.builder";
import { Pong } from "./commands/ping";
import { Ping } from "./commands/pong";

// Utilisation du package 'is-promise' dans mon framework

// A penser, avoir la possibilité d'utiliser showHelp dans les commandes
// Cela permet de couper l'exécution du programme et forcer l'affichage d'help

// Chaque commande auront dans le run une classe nommé interactions.
// Elle se chargera de géré les intéraction et la communication entres les différentes commande.

// Cli devra également posséde un injecteur de dépendance.Chaque dépendance pourra être via un décorateur
// @Service injecté dans les paramétre de la fonction run()
// Cela pourrait être également utile d'utiliser le concepte de middleware pour partager des comportement
// communs entre les différentes commandes.
// Penser à un systéme d'authenfication à l'aide d'auth0 centralisant les droits auquel
// à le droit d'accéder un utilisateur. Cela activera les commandes, arguments... auquel à le
// droit d'utiliser un utilisateur

// pour gérer les middlewares/ interceptors, il serra important de créer un package utilisant
// yargs pour gérer le flux de communication

const cliBuilder = CliBuilder.createCliBuilder();

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
  const commandBuilder = builder.map(Ping);
  const commandGroupedBuilder = builder
    .mapGrouped()
    .withInterceptor((eee) => {})
    .map(Pong);

  return builder;
});

cli.run();

/*

cli.use(router)


// plusieurs fonctions pourraient être passé en arguments
// Cela permettrait de centraliser un systéme d'authentification car commandeIinfo permet 
// d'exécuterune logique avant toute les commande



// Ou je rajouter un addAuthentification fexible comme dans mon framework
// Une commande pourrais correspondre à une ressource 
cli.beforeRunCommand((@CommandInfo() commandInfo, @Service(name) service) => {
    
})

cli.register(builder => {

  // Il n'y aura pas besoin de classe pour les commande.
  // J'insérerait uniquement des fonctions

// Je me demande si il ne serrait pas préférable d'utiliser une classe
  // next et interaction passé dans le constructeur et run j'aurait option.... 
  fn = (next, interaction, @service("serviceName") service) => {
      interaction.option
  }

  builder
    .addCommand(Ping)
    .whithInterceptors(fn, fn)
    .whitMetadata(....)

  const mapCommands = builder.mapCommands()
    .whithInterceptors(fn, fn)
    .whitMetadata(....)

  mapCommands
    .addCommand(Pong)
    .whithInterceptors(fn, fn)

})

app-cli import [options]
  --source <type> <path>
  --target <table/collection>
  --mapping <file>
  --mode <insert|update|upsert>
  --validate
  --dry-run

app-cli validate <source>

app-cli preview <source> [--limit <n>]

app-cli status [--job-id <id>]

app-cli rollback [--job-id <id>]

app-cli help



code pour crééer des command dans des command :
"
  yargs(hideBin(process.argv))
  .command('user <command>', 'Manage users', (yargs) => {
    return yargs
      .command('add [name]', 'Add a new user', (yargs) => {
        yargs.positional('name', {
          describe: 'Name of the user',
          type: 'string',
        });
      }, (argv) => {
        console.log(`Adding user: ${argv.name}`);
      })
      .command('remove [name]', 'Remove an existing user', (yargs) => {
        yargs.positional('name', {
          describe: 'Name of the user to remove',
          type: 'string',
        });
      }, (argv) => {
        console.log(`Removing user: ${argv.name}`);
      })
      .demandCommand(1, 'You need at least one user command');
  })
  .help()
  .argv;
"


"
const yargs = require('yargs');

class YargsMiddleware {
  constructor() {
    this.stack = [];
    this.errorHandlers = [];
  }

  use(fn) {
    this.stack.push(fn);
    return this;
  }

  onError(fn) {
    this.errorHandlers.push(fn);
    return this;
  }

  async execute(argv) {
    let index = 0;
    const next = async (err) => {
      if (err) {
        return this.handleError(err, argv);
      }
      const middleware = this.stack[index++];
      if (middleware) {
        try {
          await middleware(argv, next);
        } catch (error) {
          await next(error);
        }
      }
    };
    await next();
    return argv;
  }

  async handleError(err, argv) {
    for (const handler of this.errorHandlers) {
      try {
        await handler(err, argv);
        return; // Si l'erreur est gérée, on arrête le traitement
      } catch (handlerError) {
        // Si le gestionnaire d'erreurs échoue, on continue avec le suivant
        console.error('Error handler failed:', handlerError);
      }
    }
    // Si aucun gestionnaire n'a traité l'erreur, on la lance
    throw err;
  }
}

// Utilisation
const middleware = new YargsMiddleware();

middleware.use(async (argv, next) => {
  console.log('Middleware 1');
  argv.customData = 'Some data';
  await next();
});

middleware.use(async (argv, next) => {
  console.log('Middleware 2');
  if (argv.throwError) {
    throw new Error('Test error');
  }
  await next();
});

middleware.onError(async (err, argv) => {
  console.error('Error caught by central handler:', err.message);
  argv.errorHandled = true;
});

yargs
  .command('test', 'Test command', (yargs) => {
    yargs.option('throwError', {
      type: 'boolean',
      description: 'Throw a test error'
    });
  }, async (argv) => {
    try {
      argv = await middleware.execute(argv);
      console.log('Command executed with argv:', argv);
    } catch (error) {
      console.error('Unhandled error:', error);
    }
  })
  .argv;
"


*/
