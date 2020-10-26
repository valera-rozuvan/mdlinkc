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
const fs = require("fs");
const path = require("path");
function _checkIfDirExists(cwd, dirName) {
    let resolve = null;
    let reject = null;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    const fullPath = path.join(cwd, dirName);
    fs.access(fullPath, function (error) {
        if (error) {
            reject(false);
        }
        else {
            resolve(true);
        }
    });
    return promise;
}
function checkIfDirExists(cwd, dirName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield _checkIfDirExists(cwd, dirName);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
exports.checkIfDirExists = checkIfDirExists;
//# sourceMappingURL=check_if_dir_exists.js.map