import { CLI } from "../src/CLI";
import { Pong } from "./commands/ping";
import { Ping } from "./commands/pong";

// A penser, avoir la possibilité d'utiliser showHelp dans les commandes
// Cela permet de couper l'exécution du programme et forcer l'affichage d'help

const cli = CLI.Create();

cli.configure((builder) => {
  builder.options = {
    scriptName: "scriptName",
  };
  builder.help
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
