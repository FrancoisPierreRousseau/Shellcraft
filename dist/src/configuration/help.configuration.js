"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpConfiguration = void 0;
function isTypeHelpOption(object) {
    return (object &&
        typeof object === "object" &&
        typeof object.name === "string" &&
        typeof object.description === "string");
}
function isTypeHelpDisable(object) {
    return (object &&
        typeof object === "object" &&
        typeof object.enableExplicit === "boolean");
}
var HelpConfiguration = /** @class */ (function () {
    function HelpConfiguration(configurationBuilder) {
        var _this = this;
        this.options = {
            name: "help",
            description: "Show help",
        };
        this.configure = function (yargsInstance) {
            if (isTypeHelpOption(_this.options)) {
                var _a = _this.options, name_1 = _a.name, description = _a.description, alias = _a.alias;
                alias
                    ? yargsInstance.help(name_1, description).alias(name_1, alias)
                    : yargsInstance.help(name_1, description);
            }
            if (isTypeHelpDisable(_this.options)) {
                yargsInstance.help(_this.options.enableExplicit);
            }
        };
        configurationBuilder.configures.push(this.configure);
    }
    return HelpConfiguration;
}());
exports.HelpConfiguration = HelpConfiguration;
