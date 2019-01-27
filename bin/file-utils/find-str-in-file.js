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
const readline = require("readline");
function findStrInFile(filePath, searchRegExp) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve) => {
            let foundMatch = false;
            const instream = fs.createReadStream(filePath);
            instream.on('ready', () => {
                const rl = readline.createInterface({
                    input: instream,
                    terminal: false
                });
                rl.on('line', (line) => {
                    if (foundMatch) {
                        return;
                    }
                    if (searchRegExp.test(line)) {
                        foundMatch = true;
                        instream.destroy();
                        rl.close();
                    }
                })
                    .on('close', () => {
                    if (!foundMatch) {
                        instream.destroy();
                    }
                    resolve(foundMatch);
                });
            })
                .on('error', (err) => {
                if (err.code === 'ENOENT') {
                    console.log(`ERROR: File not found! filePath = '${filePath}'.`);
                }
                else if (err.code === 'EACCES') {
                    console.log(`ERROR: Permission denied! filePath = '${filePath}'.`);
                }
                else {
                    console.log(`ERROR: filePath = '${filePath}'.`);
                    console.log(err);
                }
                instream.destroy();
                resolve(foundMatch);
            });
        });
    });
}
exports.findStrInFile = findStrInFile;
//# sourceMappingURL=find-str-in-file.js.map