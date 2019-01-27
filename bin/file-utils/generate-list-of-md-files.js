"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
function isDirectory(filePath) {
    return fs_1.statSync(filePath).isDirectory();
}
function isFile(filePath) {
    return fs_1.statSync(filePath).isFile();
}
function getFsObjects(filePath, fsObjType) {
    let fileList = null;
    try {
        fileList = fs_1.readdirSync(filePath);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            console.log(`ERROR: File or directory not found! filePath = '${filePath}'.`);
        }
        else if (err.code === 'EACCES') {
            console.log(`ERROR: Permission denied! filePath = '${filePath}'.`);
        }
        else {
            console.log(`filePath = '${filePath}'.`);
            console.log(err);
        }
        return [];
    }
    if (!fileList || !fileList.length) {
        return [];
    }
    const fsObjTypeToFn = {
        file: isFile,
        directory: isDirectory
    };
    return fileList.map((name) => {
        return path.join(filePath, name);
    }).filter(fsObjTypeToFn[fsObjType]);
}
function getFilesRecursively(filePath) {
    const dirs = getFsObjects(filePath, 'directory');
    if (!dirs || !dirs.length) {
        return [];
    }
    const files = dirs
        // go through each directory
        .map((dir) => getFilesRecursively(dir))
        // map returns a 2d array (array of file arrays) so flatten
        .reduce((a, b) => a.concat(b), []);
    // Add files in top level directory before returning the list.
    return files.concat(getFsObjects(filePath, 'file'));
}
function generatelistOfMdFiles(srcDir) {
    return getFilesRecursively(srcDir)
        .filter((filePath) => {
        const mdFileEndingRegExp = /\.md$/ig;
        return mdFileEndingRegExp.test(filePath);
    });
}
exports.generatelistOfMdFiles = generatelistOfMdFiles;
//# sourceMappingURL=generate-list-of-md-files.js.map