import * as fs from 'fs';
import * as readline from 'readline';

async function findStrInFile(filePath: string, searchRegExp: RegExp): Promise<boolean> {
  return await new Promise<boolean>((resolve) => {
    let foundMatch = false;

    const instream = fs.createReadStream(filePath);
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
        rl.close();
        instream.destroy();
      }
    })
    .on('close', () => {
      if (!foundMatch) {
        instream.destroy();
      }

      resolve(foundMatch);
    });
  });
}

export {
  findStrInFile
};
