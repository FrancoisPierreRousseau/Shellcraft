"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
var CommandManager = /** @class */ (function () {
    function CommandManager(commandsClasses) {
        var _this = this;
        this.commands = new Map();
        commandsClasses.forEach(function (commandClass) {
            _this.commands.set(commandClass.name, commandClass);
        });
    }
    return CommandManager;
}());
exports.CommandManager = CommandManager;
