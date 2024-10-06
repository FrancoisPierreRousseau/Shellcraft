"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
var help_configuration_1 = require("./help.configuration");
var Configuration = /** @class */ (function () {
    function Configuration(configurationBuilder) {
        var _this = this;
        this.helpCongiguration = new help_configuration_1.HelpConfiguration({});
        this.configure = function (yargsInstance) {
            var _a;
            if ((_a = _this.options) === null || _a === void 0 ? void 0 : _a.scriptName) {
                yargsInstance.scriptName(_this.options.scriptName);
            }
        };
        configurationBuilder.configures.push(this.configure);
    }
    Configuration.prototype.help = function (options) {
        return new help_configuration_1.HelpConfiguration(options).configure;
    };
    return Configuration;
}());
exports.Configuration = Configuration;
