"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function loadConfigFile(cwd, configName) {
    return __awaiter(this, void 0, void 0, function* () {
        const shortPath = `configs/${configName}.js`;
        const fullPath = path.join(cwd, shortPath);
        try {
            return require(fullPath);
        }
        catch (err) {
            return null;
        }
    });
}
exports.loadConfigFile = loadConfigFile;
//# sourceMappingURL=load_config_file.js.map