import * as path from 'path';
import { generatelistOfMdFiles, findStrInFiles } from './file-utils';

export class Mdlinkc {
  private listOfMdFiles: string[] = [];
  private sectionToFileHash: { [key: string]: string[] } = {};

  public constructor(private srcDir: string) {
    if (!path.isAbsolute(srcDir)) {
      this.srcDir = path.resolve(srcDir);
    }
  }

  public async getLinks(section: string): Promise<string[]> {
    if (this.listOfMdFiles.length === 0) {
      this.listOfMdFiles = generatelistOfMdFiles(this.srcDir);
    }

    if (this.listOfMdFiles.length === 0) {
      console.log(`srcDir contains 0 '.md' files.`);
      return [];
    }

    const regExpStr = '^\\#+\\s' + section + '\\s*$';
    const filesWithSection = await findStrInFiles(
      this.listOfMdFiles, new RegExp(regExpStr, 'ig')
    );

    if (filesWithSection.length === 0) {
      console.log(`found 0 '.md' files with section.`);
    } else {
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
  }
}
