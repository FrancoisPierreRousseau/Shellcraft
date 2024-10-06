"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.CommandDecorator = void 0;
require("reflect-metadata");
var CommandDecorator = /** @class */ (function () {
    function CommandDecorator(target) {
        this.target = target;
        this.metadata = Reflect.getMetadata("command", target) || {
            target: target,
        };
    }
    CommandDecorator.prototype.update = function () {
        Reflect.defineMetadata("command", this.metadata, this.target);
    };
    return CommandDecorator;
}());
exports.CommandDecorator = CommandDecorator;
function Command() {
    return function (target) {
        var commandDecorator = new CommandDecorator(target);
        commandDecorator.update();
    };
}
exports.Command = Command;
