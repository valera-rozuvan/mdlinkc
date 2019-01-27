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
        console.log(`srcDir = '${srcDir}'`);
        if (path.isAbsolute(srcDir)) {
            console.log('the specified path is absolute');
        }
        else {
            console.log('the specified path is relative, converting');
            const fullPath = path.resolve(srcDir);
            console.log(`the full path is '${fullPath}'`);
            this.srcDir = fullPath;
        }
    }
    getLinks(section) {
        return __awaiter(this, void 0, void 0, function* () {
            // const mainMdFile = path.join(this.srcDir, 'README.md');
            // console.log(`mainMdFile = '${mainMdFile}'`);
            this.listOfMdFiles = file_utils_1.generatelistOfMdFiles(this.srcDir);
            // this.listOfMdFiles.forEach((mfDile, idx) => {
            //   console.log(`[${idx}]: file => '${mfDile}'`);
            // });
            console.log(`Looking for files which contain section '${section}'.`);
            const regExpStr = '^\\#+\\s' + section + '\\s*$';
            console.log(`Section regExpStr = '${regExpStr}'.`);
            console.log('File matches:');
            const filesWithSection = yield file_utils_1.findStrInFiles(this.listOfMdFiles, new RegExp(regExpStr, 'ig'));
            if (!this.sectionToFileHash[section]) {
                this.sectionToFileHash[section] = [];
            }
            const hash = this.sectionToFileHash[section];
            filesWithSection.forEach((filePath) => {
                if (hash.indexOf(filePath) === -1) {
                    hash.push(filePath);
                }
            });
            filesWithSection.forEach((mfDile, idx) => {
                console.log(`[${idx}]: file => '${mfDile}'`);
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