import { readdirSync, statSync } from 'fs';
import * as path from 'path';

function isDirectory(filePath: string): boolean {
  return statSync(filePath).isDirectory();
}

function getDirectories(filePath: string): string[] {
  return readdirSync(filePath).map((name) => {
    return path.join(filePath, name);
  }).filter(isDirectory);
};

function isFile(filePath: string): boolean {
  return statSync(filePath).isFile();
};

function getFiles(filePath: string): string[] {
  return readdirSync(filePath).map((name) => {
    return path.join(filePath, name);
  }).filter(isFile);
};

function getFilesRecursively(filePath: string): string[] {
  let dirs = getDirectories(filePath);
  let files = dirs
    // go through each directory
    .map((dir) => getFilesRecursively(dir))
    // map returns a 2d array (array of file arrays) so flatten
    .reduce((a, b) => a.concat(b), []);

  return files.concat(getFiles(filePath));
};

function generatelistOfMdFiles(srcDir: string): string[] {
  return getFilesRecursively(srcDir)
    .filter((filePath) => {
      const mdFileEnding = /\.md$/ig;

      return mdFileEnding.test(filePath);
    });
}

export {
  generatelistOfMdFiles
};
