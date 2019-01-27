import * as path from 'path';
import { generatelistOfMdFiles, findStrInFiles } from './file-utils';

export class Mdlinkc {
  private listOfMdFiles: string[] = [];
  private sectionToFileHash: { [key: string]: string[] } = {};

  public constructor(private srcDir: string) {
    console.log(`srcDir = '${srcDir}'`);

    if (path.isAbsolute(srcDir)) {
      console.log('the specified path is absolute');
    } else {
      console.log('the specified path is relative, converting');
      const fullPath = path.resolve(srcDir);
      console.log(`the full path is '${fullPath}'`);
      this.srcDir = fullPath;
    }
  }

  public async getLinks(section: string): Promise<string[]> {
    // const mainMdFile = path.join(this.srcDir, 'README.md');
    // console.log(`mainMdFile = '${mainMdFile}'`);

    this.listOfMdFiles = generatelistOfMdFiles(this.srcDir);

    // this.listOfMdFiles.forEach((mfDile, idx) => {
    //   console.log(`[${idx}]: file => '${mfDile}'`);
    // });

    console.log(`Looking for files which contain section '${section}'.`);
    const regExpStr = '^\\#+\\s' + section + '\\s*$';
    console.log(`Section regExpStr = '${regExpStr}'.`);
    console.log('File matches:');

    const filesWithSection = await findStrInFiles(
      this.listOfMdFiles, new RegExp(regExpStr, 'ig')
    );

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
  }
}
