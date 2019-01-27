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
const file_utils_1 = require("./file-utils");
class Mdlinkc {
    constructor(srcDir) {
        this.srcDir = srcDir;
        this.listOfMdFiles = [];
        this.sectionToFileHash = {};
        if (!path.isAbsolute(srcDir)) {
            this.srcDir = path.resolve(srcDir);
        }
    }
    getLinks(section) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.listOfMdFiles.length === 0) {
                this.listOfMdFiles = file_utils_1.generatelistOfMdFiles(this.srcDir);
            }
            if (this.listOfMdFiles.length === 0) {
                console.log(`srcDir contains 0 '.md' files.`);
                return [];
            }
            const regExpStr = '^\\#+\\s' + section + '\\s*$';
            const filesWithSection = yield file_utils_1.findStrInFiles(this.listOfMdFiles, new RegExp(regExpStr, 'ig'));
            if (filesWithSection.length === 0) {
                console.log(`found 0 '.md' files with section.`);
            }
            else {
                filesWithSection.forEach((mfDile, idx) => {
                    console.log(`[${idx}]: file => '${mfDile}'`);
                });
            }
            if (!this.sectionToFileHash[section]) {
                this.sectionToFileHash[section] = [];
            }
            const hash = this.sectionToFileHash[section];
            filesWithSection.forEach((filePath) => {
                if (hash.indexOf(filePath) === -1) {
                    hash.push(filePath);
                }
            });
            return [
                'link1',
                'link2'
            ];
        });
    }
}
exports.Mdlinkc = Mdlinkc;
//# sourceMappingURL=main.js.map