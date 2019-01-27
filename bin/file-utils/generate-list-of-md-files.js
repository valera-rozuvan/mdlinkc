"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
function isDirectory(filePath) {
    return fs_1.statSync(filePath).isDirectory();
}
function getDirectories(filePath) {
    return fs_1.readdirSync(filePath).map((name) => {
        return path.join(filePath, name);
    }).filter(isDirectory);
}
;
function isFile(filePath) {
    return fs_1.statSync(filePath).isFile();
}
;
function getFiles(filePath) {
    return fs_1.readdirSync(filePath).map((name) => {
        return path.join(filePath, name);
    }).filter(isFile);
}
;
function getFilesRecursively(filePath) {
    let dirs = getDirectories(filePath);
    let files = dirs
        // go through each directory
        .map((dir) => getFilesRecursively(dir))
        // map returns a 2d array (array of file arrays) so flatten
        .reduce((a, b) => a.concat(b), []);
    return files.concat(getFiles(filePath));
}
;
function generatelistOfMdFiles(srcDir) {
    return getFilesRecursively(srcDir)
        .filter((filePath) => {
        const mdFileEnding = /\.md$/ig;
        return mdFileEnding.test(filePath);
    });
}
exports.generatelistOfMdFiles = generatelistOfMdFiles;
//# sourceMappingURL=generate-list-of-md-files.js.map