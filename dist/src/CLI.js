"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
var yargs_1 = __importDefault(require("yargs"));
var helpers_1 = require("yargs/helpers");
require("reflect-metadata");
var command_manager_1 = require("./commands/command.manager");
var global_configuration_1 = require("./configuration/global.configuration");
var CLI = /** @class */ (function () {
    function CLI() {
        this.yargsInstance = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv));
        this.configures = [];
        // console.log(Object.keys(this.options?.help ?? {}));
        // console.log(ddd.arguments);
    }
    CLI.Create = function () {
        return new CLI();
    };
    CLI.prototype.configure = function (callback) {
        var configuration = new global_configuration_1.Configuration(this);
        callback(configuration);
        return this;
    };
    CLI.prototype.register = function () {
        var commandsClasses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            commandsClasses[_i] = arguments[_i];
        }
        var commandManager = new command_manager_1.CommandManager(commandsClasses);
    };
    CLI.prototype.run = function () {
        for (var _i = 0, _a = this.configures; _i < _a.length; _i++) {
            var configure = _a[_i];
            configure(this.yargsInstance);
        }
        this.yargsInstance.usage("$0 <cmd> [args]").command("hello [name]", "welcome ter yargs!", function (yargs) {
            yargs.positional("name", {
                type: "string",
                default: "Cambi",
                describe: "the name to say hello to",
            });
        }, function (argv) {
            console.log("hello", argv.name, "welcome to yargs!");
        });
        this.yargsInstance.parse();
    };
    CLI.prototype.build = function () { };
    return CLI;
}());
exports.CLI = CLI;
