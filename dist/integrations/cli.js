"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CLI_1 = require("../src/CLI");
var ping_1 = require("./commands/ping");
var pong_1 = require("./commands/pong");
// A penser, avoir la possibilité d'utiliser showHelp dans les commandes
// Cela permet de couper l'exécution du programme et forcer l'affichage d'help
var cli = CLI_1.CLI.Create();
cli.configure(function (builder) {
    builder.options = {
        scriptName: "scriptName",
    };
    builder.help.options = {
        description: "une sacré description de la mort qui tue",
        name: "help",
        alias: "e",
    };
});
cli.register(pong_1.Ping, ping_1.Pong);
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
