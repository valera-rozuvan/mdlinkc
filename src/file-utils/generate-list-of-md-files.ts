import { readdirSync, statSync } from 'fs';
import * as path from 'path';

function isDirectory(filePath: string): boolean {
  return statSync(filePath).isDirectory();
}

function isFile(filePath: string): boolean {
  return statSync(filePath).isFile();
}

function getFsObjects(filePath: string, fsObjType: string): string[] {
  let fileList = null;

  try {
    fileList = readdirSync(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`ERROR: File or directory not found! filePath = '${filePath}'.`);
    } else if (err.code === 'EACCES') {
      console.log(`ERROR: Permission denied! filePath = '${filePath}'.`);
    } else {
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
  }

  return fileList.map((name) => {
    return path.join(filePath, name);
  }).filter(fsObjTypeToFn[fsObjType]);
}

function getFilesRecursively(filePath: string): string[] {
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

function generatelistOfMdFiles(srcDir: string): string[] {
  return getFilesRecursively(srcDir)
    .filter((filePath) => {
      const mdFileEndingRegExp = /\.md$/ig;

      return mdFileEndingRegExp.test(filePath);
    });
}

export {
  generatelistOfMdFiles
};
