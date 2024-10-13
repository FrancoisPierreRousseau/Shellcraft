import { CLI } from "../src/CLI";
import { Pong } from "./commands/ping";
import { Ping } from "./commands/pong";

// A penser, avoir la possibilité d'utiliser showHelp dans les commandes
// Cela permet de couper l'exécution du programme et forcer l'affichage d'help

// Chaque commande auront dans le run une classe nommé interactions.
// Elle se chargera de géré les intéraction et la communication entres les différentes commande.

// Cli devra également posséde un injecteur de dépendance.Chaque dépendance pourra être via un décorateur
// @Service injecté dans les paramétre de la fonction run()
// Cela pourrait être également utile d'utiliser le concepte de middleware pour partager des comportement
// communs entre les différentes commandes. 

const cli = CLI.Create();

cli.configure((builder) => {
  builder.options = {
    scriptName: "scriptName",
  };
  builder.help.options = {
    description: "une sacré description de la mort qui tue",
    name: "help",
    alias: "e",
  };
});

cli.register(Ping, Pong);

cli.run();

/*

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

*/
